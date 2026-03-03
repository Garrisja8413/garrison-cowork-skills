---
name: pp-reference-sync
description: >
  Manages the firm's client reference spreadsheet (pp-client-reference.xlsx) which maps client names
  to PracticePanther Contact GUIDs, Matter GUIDs, and Outlook folder names. The spreadsheet is the
  single source of truth used by billing-audit and pp-time-entry. This skill can also optionally
  scrape PracticePanther's Matters grid to populate the GUID columns. Use this skill when Jake asks
  to update the client reference, refresh GUIDs from PP, add a new client to the reference, sync
  PP data, fill in missing GUIDs, or when another skill reports a GUID lookup miss. Also trigger
  for "update the spreadsheet", "add [client] to the reference", "sync PP", or "refresh client data".
---

# PP Reference Sync

Maintains `pp-client-reference.xlsx` — the firm's master lookup for resolving client names to
PracticePanther GUIDs and Outlook folder names. Billing-audit and pp-time-entry both read from
this file.

## Reference File Location

The spreadsheet lives in the user's workspace folder. Search for it:

```
Glob: **/pp-client-reference.xlsx
```

## Spreadsheet Structure

| Column | Content | Source |
|--------|---------|--------|
| A: Matter # | e.g., CAS 03/001 | Manual |
| B: Client Name | e.g., Carlos Casares | Manual |
| C: Matter Description | e.g., Defense of claims... | Manual |
| D: Practice Area | e.g., residential real estate | Manual |
| E: Retained Date | MM/DD/YYYY | Manual |
| F: Billed Through | Date or "no bill yet" | Manual |
| G: Retainer Amount | Dollar amount | Manual |
| H: Contact GUID | PP GUID | PP scrape or manual |
| I: Matter GUID | PP GUID | PP scrape or manual |
| J: Outlook Folder | Folder name in Outlook | Manual |
| K: Hourly Rate | Default $350 | Manual |
| L: Notes | Free text | Manual |

Yellow-highlighted cells (H, I, J) are the ones that need to be filled in.

## Common Tasks

### Adding a New Client Manually

1. Open the spreadsheet with openpyxl.
2. Append a row with the client details Jake provides.
3. Leave GUID columns blank (yellow highlight) unless Jake provides them.
4. Save.

### Populating GUIDs from PracticePanther (Optional Scrape)

When Jake asks to fill in missing GUIDs, or when a downstream skill reports a lookup miss:

1. Navigate to `https://app.practicepanther.com/Project/` in the browser.
2. Expand the Kendo grid to show all records:
   ```javascript
   jQuery('.k-grid').data('kendoGrid').dataSource.pageSize(1000);
   ```
3. Wait ~3 seconds for the grid to load.
4. Extract data in chunks of 250 to avoid memory issues:
   ```javascript
   (function(start, size) {
     var data = jQuery('.k-grid').data('kendoGrid').dataSource.data();
     var end = Math.min(start + size, data.length);
     var results = [];
     for (var i = start; i < end; i++) {
       var d = data[i];
       results.push({
         contact: d.Account ? d.Account.NameAndNumber : '',
         contactGuid: d.Account ? d.Account.Guid : '',
         matterGuid: d.Guid,
         matterName: d.Name,
         status: d.StatusName
       });
     }
     return JSON.stringify(results);
   })(0, 250);
   ```
5. Match extracted records to spreadsheet rows by client name (fuzzy match — strip parenthetical
   client numbers from PP's `Account.NameAndNumber`).
6. Write the Contact GUID and Matter GUID into columns H and I for each matched row.
7. Save the spreadsheet. Report how many rows were updated and any unmatched records.

### Looking Up a Client

Other skills (billing-audit, pp-time-entry) read this spreadsheet to resolve a client name.
The lookup logic:

1. Read the spreadsheet with openpyxl or pandas.
2. Search column B (Client Name) for a case-insensitive partial match.
3. Return the Contact GUID (col H), Matter GUID (col I), Outlook Folder (col J), and Rate (col K).
4. If GUID columns are empty, flag it and suggest running the PP scrape.

## Firm Context

- **Firm**: The Garrison Law Firm, LLC — solo practitioner (Jake A. Garrison)
- **PP URL**: app.practicepanther.com (Kendo UI framework, jQuery global)
- **~100 active matters** at any given time
