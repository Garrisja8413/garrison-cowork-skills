# Remote Deposition Protocols (The Integrity Engine) — Detailed Reference

## Overview

Remote depositions introduce unique risks: witness coaching via off-camera
channels, environmental compromise, exhibit control issues, and technology
failures. The Integrity Engine enforces strict controls to maintain the
same evidentiary quality as in-person depositions.

---

## Protocol 1: Anti-Coaching Stipulation

### Purpose
Establish binding ground rules on the record before substantive questioning
begins. The stipulation creates a sanctionable standard if violated.

### Auto-Generated Stipulation Script

The AI generates this for the attorney to read on the record at the start:

```
"Before we begin, I'd like to place the following stipulation on the record
regarding remote deposition protocols. Counsel, please indicate your
agreement or objection to each:

1. WITNESS ISOLATION: The witness confirms they are alone in the room.
   No other person is present or able to observe the proceedings through
   any means — including open doors, adjacent rooms, or monitoring devices.

2. NO OFF-CAMERA COMMUNICATIONS: The witness agrees not to send or receive
   any text messages, emails, instant messages, or other communications
   during the deposition while a question is pending. This includes but is
   not limited to: cell phones, tablets, computers (other than the device
   used for the video platform), smartwatches, and any other communication
   device.

3. NO CONFERENCES WHILE QUESTION PENDING: Consistent with NMRA 1-030(D)(1)
   and FRCP 30(c)(2), there shall be no conferences between the witness
   and counsel while a question is pending. During breaks, counsel may
   confer with the witness, but the witness shall disclose on the record
   whether they discussed any pending question or topic.

4. CAMERA AND AUDIO: The witness's camera shall remain on and positioned
   to show the witness's face and upper body throughout the deposition.
   The witness shall not mute their microphone during testimony.

5. ROOM SCAN: The witness agrees to perform a 360-degree room scan with
   their camera upon request to confirm the environment.

6. DOCUMENTS: The witness shall not consult any documents, notes, or
   materials during the deposition unless directed to do so by examining
   counsel or with permission noted on the record.

Counsel, do you stipulate to these protocols?"
```

### If Opposing Counsel Objects
```
"I understand counsel's objection. For the record, these protocols are
consistent with the requirements of NMRA 1-030 and FRCP 30, and reflect
standard practice for remote depositions. I will proceed and note any
violations on the record. If necessary, I will seek relief from the court."
```

---

## Protocol 2: Environmental Telemetry Monitoring

### Eye-Tracking Indicators

The AI monitors for visual indicators that suggest the witness is receiving
off-camera coaching or reading prepared materials.

| Indicator | Description | AI Alert |
|-----------|-------------|----------|
| **Gaze Left/Right** | Witness eyes consistently moving to a point off-screen | "Eye tracking: witness appears to be reading from off-screen {left/right}." |
| **Gaze Down** | Witness frequently looking down (phone/tablet in lap) | "Eye tracking: witness frequently looking down — possible device." |
| **Gaze Up-Right** | Can indicate recall construction vs. recall access | Informational only — note for behavioral analysis |
| **Delayed Eye Contact** | Witness looks away before answering, then re-establishes | "Latency pattern: witness consistently breaks gaze before answering — note for analysis." |

### Audio Latency Analysis

| Indicator | Description | AI Alert |
|-----------|-------------|----------|
| **Inconsistent Latency** | Response delay varies significantly (some instant, some 10+ seconds) | "Audio latency inconsistency — answers to sensitive questions have {X}s average delay vs. {Y}s for routine questions." |
| **Background Audio** | Faint voices, keyboard clicks, notification sounds | "Background audio detected: {description}. Possible off-camera communication." |
| **Mute Gaps** | Brief mute activations between questions | "Witness appears to have briefly muted — possible off-camera conference." |

### Response Script (When Indicators Detected)

**Mild Concern:**
```
"[Witness], I want to make sure we have a clean record. Are you looking
at any documents or notes right now?"
```

**Moderate Concern:**
```
"[Witness], I'm noticing some activity that I want to address on the
record. Are you receiving any text messages, emails, or other
communications right now? Is anyone communicating with you by any means?"
```

**Serious Concern:**
```
"[Witness], I need to ask you to perform a room scan. Please pick up
your camera or laptop and slowly show me a 360-degree view of your room.
I also need to see your desk surface and any devices within reach."

[After room scan]

"Thank you. For the record, the room scan showed {observations}.
[Witness], do you have any devices other than the one you're using
for this video within arm's reach?"
```

**Coaching Detected:**
```
"Let the record reflect that I observed {specific observation — e.g.,
'the witness appeared to be reading from a device below camera view'
or 'a voice was audible in the background'}.

Counsel, are you communicating with your client right now by any means?

I am suspending this deposition and will move for sanctions under
FRCP 30(d)(3) / NMRA 1-030(D)(3) based on the apparent coaching violation."
```

---

## Protocol 3: Exhibit Workflow Optimization

### Strategy Selection

The exhibit handling strategy depends on the witness's cooperation level:

| Witness Profile | Exhibit Strategy | Rationale |
|----------------|-----------------|-----------|
| **Cooperative / Neutral** | Pre-marked PDF set shared 24-48 hours before | Saves time, witness can follow along, faster foundation |
| **Hostile / Coached** | Live-exhibit platform only (no preview) | Prevents witness from previewing exhibits and preparing coached responses |
| **Corporate Designee** | Hybrid — share document indices, withhold key exhibits | Allow preparation on general topics, preserve surprise on impeachment documents |
| **Expert** | Pre-share learned treatises, withhold prior transcripts | Experts expect to see authorities; prior testimony is for impeachment |

### Live Exhibit Platform Protocol

When using a live-exhibit platform (no pre-sharing):

```
[EXHIBIT-SHARE] "I'm now sharing Exhibit {N} on screen. Can you see it?"
[EXHIBIT-CONFIRM] "Is the document legible on your screen?"
[EXHIBIT-DIRECT] "Please look at page {X}, {section/paragraph}."
[EXHIBIT-READ] "Please read the highlighted portion to yourself."
[EXHIBIT-PAUSE] [Allow 15-30 seconds for reading]
[EXHIBIT-CONFIRM] "Have you had sufficient time to review that portion?"
[EXHIBIT-QUESTION] "{Substantive question about the document}"
```

### Exhibit Record Preservation

For remote depositions, additional foundation for exhibit handling:
```
"For the record, I am sharing Exhibit {N} via {platform}. The document
is Bates-stamped {range}. The witness has confirmed they can see the
document on their screen."
```

---

## Protocol 4: Technology Failure Management

### Connection Loss Protocol

| Duration | Action |
|----------|--------|
| < 30 seconds | Note on record, continue |
| 30 sec — 2 min | "Let the record reflect a brief connection interruption. [Witness], can you hear me? Did you hear the entirety of my last question?" |
| 2 — 5 min | Go off record. Reconvene. Re-read last pending question. |
| > 5 min | Attempt reconnection. If unsuccessful, reschedule continuation. |

### Audio/Video Quality Issues

```
"For the record, I'm experiencing {audio delay / video freeze / poor audio
quality}. Before we continue, I want to ensure the court reporter is
capturing testimony accurately and the video record is intact.

Court reporter, are you able to hear the witness clearly?
Videographer, is the video recording intact?"
```

### Recording Integrity

```
"Videographer, please confirm that the recording has been continuous
since we went on the record. Were there any gaps in the recording during
the connection interruption?"
```

---

## Protocol 5: Break Management (Remote-Specific)

### Pre-Break Script
```
"We're going to take a {X}-minute break. Before we go off the record:

[Witness], I have a question pending — specifically: {question}.
Under NMRA 1-030(D)(1), you and your counsel may not discuss this
pending question during the break.

You may discuss other topics with your counsel.

When we return, I will ask whether any pending questions or topics
were discussed during the break.

We are off the record at {time}."
```

### Post-Break Script
```
"We are back on the record at {time}. That was a {X}-minute break.

[Witness], during the break, did you discuss any pending questions or
topics from this deposition with anyone?

Did you review any documents, notes, or communications during the break?

Did anyone other than your counsel communicate with you during the break?

Thank you. We'll continue."
```

---

## Remote Deposition Checklist (PREP Phase)

The AI generates this checklist during PREP for the attorney:

```
PRE-DEPOSITION (24-48 hours before):
□ Confirm video platform and test connection
□ Prepare exhibit strategy (pre-share vs. live)
□ Pre-mark all exhibits as PDFs
□ Send exhibits to court reporter
□ Draft stipulation script
□ Confirm court reporter + videographer are remote-capable

DAY-OF (30 minutes before):
□ Test screen sharing
□ Test exhibit platform
□ Confirm recording setup with videographer
□ Have backup connection method ready (phone dial-in)

ON THE RECORD:
□ Read stipulation script
□ Confirm witness is alone
□ Request initial room scan
□ Confirm camera/audio setup
□ Begin substantive examination
```

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
