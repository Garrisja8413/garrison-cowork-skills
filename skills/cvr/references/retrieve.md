# RETRIEVE Stage — Reference (CVR v1.0)

Read this file when entering RETRIEVE mode.

## Purpose

Navigate Lexis+ via browser automation to retrieve full opinion text for each
case in the Citation Index. This is the most time-intensive phase and requires
careful, methodical execution.

## Prerequisites

- Chrome browser tools must be available (Claude in Chrome / Cowork browser)
- User must have an active Lexis+ subscription
- User must be logged in (or will log in when prompted)

## Authentication Protocol

**CVR NEVER enters credentials.** If at any point a login screen appears:
1. Stop all automation
2. Tell the user: "Lexis is requesting authentication. Please log in, then tell
   me to continue."
3. Wait for the user to confirm they are logged in
4. Resume from where you left off

## Retrieval Workflow (Per Case)

### Step 1: Navigate to Lexis+
If not already on Lexis+, navigate to `https://plus.lexis.com/`

### Step 2: Search for the Case
1. Locate the search bar on Lexis+
2. Enter the full citation (e.g., "477 U.S. 317")
3. Execute the search
4. Wait for results to load

### Step 3: Identify the Correct Case
- Verify the case name matches the Citation Index entry
- If multiple results appear, select the one matching case name AND citation
- If the case is not found:
  - Try alternative citation formats (e.g., parallel citation)
  - Try searching by case name: "Celotex Corp. v. Catrett"
  - If still not found, mark RetrievalStatus = NOT-FOUND

### Step 4: Access the Full Opinion
- Click through to the full opinion text
- Ensure you are viewing the **full opinion**, not a headnote summary or
  syllabus
- If access is restricted (paywall, subscription tier), mark RetrievalStatus =
  RESTRICTED and move to the next case

### Step 5: Extract Full Opinion Text
- Use `get_page_text` or `read_page` to capture the complete opinion text
- For long opinions, scroll through the entire document to ensure complete
  capture
- Save the full text to: `CVR-[CiteID]-[ShortCaseName].txt`

**Completeness check:** The extracted text should include:
- Case caption
- Court identification
- Date of decision
- All opinion sections (majority, concurrence, dissent if present)
- All footnotes

If the opinion is very long (50+ pages), extract in sections:
1. Read and save the first section
2. Scroll to continue
3. Append subsequent sections to the same file
4. Verify no gaps between sections

### Step 6: Update Citation Index
- Set RetrievalStatus = RETRIEVED
- Save the updated Citation Index

### Step 7: Announce Progress
```
**Retrieved: CVR-[CiteID] — [CaseName]**
- Full opinion: [word count] words
- Saved: CVR-[CiteID]-[ShortName].txt
- Progress: [X] of [N] cases retrieved
```

## Handling Edge Cases

### Case Not on Lexis+
Some older or unpublished cases may not be available. Options:
1. Try alternative search terms
2. Try Google Scholar as a fallback (announce to user)
3. Mark as NOT-FOUND with a note suggesting the user check Westlaw or direct
   court records

### Restricted Access
If the user's Lexis+ subscription does not include the case:
1. Mark as RESTRICTED
2. Note what subscription tier appears to be required
3. Continue with next case

### Lexis+ Navigation Changes
Lexis+ may update its interface. If expected elements are not found:
1. Take a screenshot
2. Show the user
3. Ask for guidance on navigating the current interface
4. Adapt the automation accordingly

### Rate Limiting or CAPTCHA
If Lexis+ presents rate limiting or CAPTCHA:
1. Stop automation immediately
2. Inform the user
3. Wait for the user to resolve it
4. Resume from the last successfully retrieved case

## Session Management

- Save the Citation Index after EVERY case retrieval
- If the session is interrupted, the user can resume from the last PENDING case
- Never re-retrieve a case already marked RETRIEVED unless the user requests it

## Pace Control

Retrieve no more than **5 cases per session segment** before pausing to report
status. This prevents overloading Lexis+ and keeps the user informed.

After 5 cases:
```
**Retrieval checkpoint — [5] of [N] cases retrieved.**
- RETRIEVED: [list]
- PENDING: [remaining count]
- NOT-FOUND: [list if any]

Reply 'continue' to retrieve the next batch.
```
