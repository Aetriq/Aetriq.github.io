# INTRASTICE
**Version:** [INSERT VERSION] | **Status:** [INSERT STATUS, e.g., Active Development]
**Repository:** [INSERT GITHUB LINK] | **Author:** Alex Gordon (Aetriq / Veetwo)

> **[SYS_NOTE]** 
> [INSERT BRIEF 1-2 SENTENCE PROJECT SUMMARY. E.g., Extremely compact 220mm HBot 3D printer integrating Edge ML vision and Klipper firmware.]

---

## Table of Contents
*Auto-generate this section using GitHub's built-in TOC or a Markdown TOC plugin.*
1. [System Overview](#10-system-overview)
2. [Release Log](#20-release-log)
3. [Technical Specifications](#30-technical-specifications)
4. [Bill of Materials (BOM)](#40-bill-of-materials)
5. [Hardware & Kinematics](#50-hardware--kinematics)
6. [Electronics Architecture](#60-electronics-architecture)
7. [Edge AI Vision System](#70-edge-ai-vision-system)
8. [Firmware Configuration](#80-firmware-configuration)
9. [Known Issues & Errata](#90-known-issues--errata)

---

## 1.0 System Overview
[INSERT HIGH-LEVEL DESCRIPTION. What is it? Why was it built? What problems does it solve compared to the original MakerBot Replicator?]

### 1.1 Core Objectives
* **[OBJECTIVE 1]:** [INSERT DETAIL]
* **[OBJECTIVE 2]:** [INSERT DETAIL]
* **[OBJECTIVE 3]:** [INSERT DETAIL]

---

## 2.0 Release Log
*For full version history, refer to [CHANGELOG.md](INSERT LINK).*

| Version | Date | Key Changes |
| :--- | :--- | :--- |
| `v[X.X]` | `[YYYY-MM-DD]` | [INSERT BULLET POINT SUMMARY OF LATEST UPDATE] |
| `v[X.X]` | `[YYYY-MM-DD]` | [INSERT BULLET POINT SUMMARY OF PREVIOUS UPDATE] |

---

## 3.0 Technical Specifications

### 3.1 Physical & Kinematic
| Parameter | Specification |
| :--- | :--- |
| **Footprint Ratio** | [INSERT VALUE] |
| **Build Volume** | [INSERT DIMENSIONS] |
| **Kinematics** | [INSERT KINEMATICS, e.g., HBot / Cantilever Z] |
| **Motion System** | [INSERT DETAILS, e.g., MGN9H Rails] |

### 3.2 Electrical & Compute
| Parameter | Specification |
| :--- | :--- |
| **Primary MCU** | [INSERT MCU] |
| **Vision Compute** | [INSERT COMPUTE, e.g., ESP32-S / ESP32-CAM] |
| **Power Bus** | [INSERT POWER SPECS, e.g., 24V / 12V / 5V Logic] |
| **Firmware** | [INSERT FIRMWARE, e.g., Klipper / Mainsail] |

---

## 4.0 Bill of Materials
> **[LINK TO MASTER BOM SHEET]** -> [INSERT URL, e.g., Google Sheets or CSV in repo]

### 4.1 Critical Components
| Component | Qty | Description | Note / Source |
| :--- | :--- | :--- | :--- |
| `[ITEM NAME]` | `[#]` | `[DESCRIPTION]` | `[LINK/NOTE]` |
| `[ITEM NAME]` | `[#]` | `[DESCRIPTION]` | `[LINK/NOTE]` |

---

## 5.0 Hardware & Kinematics

### 5.1 Frame & Chassis
[INSERT DETAILS ON FRAME MODIFICATIONS, BRACKETS, AND BAY ORGANIZATIONS]
* **Render/Diagram:** `![Frame Layout](INSERT IMAGE PATH)`

### 5.2 X/Y Gantry (HBot)
[INSERT DETAILS ON BELT ROUTING, IDLERS, AND TENSIONING]
* **Belt Routing Diagram:** `![HBot Routing](INSERT IMAGE PATH)`

### 5.3 Z-Axis & Bed
[INSERT DETAILS ON CANTILEVER DESIGN, LEADSCREWS, AND BED LEVELING PROBES]

### 5.4 Toolhead & Extrusion
[INSERT DETAILS ON E3D V6, TITAN EXTRUDER, CPAP COOLING, ETC.]

---

## 6.0 Electronics Architecture

### 6.1 Power Distribution
[INSERT DETAILS ON 24V MIGRATION, LM2596 (12V), GYVRM (5V), AND CROWBAR PROTECTION CIRCUIT]

### 6.2 MCU & SBC Wiring
[INSERT DETAILS ON RP2040 INTEGRATION AND PINOUTS]

### 6.3 Hardware Diagrams
> **[SYS_WARNING]** 
> [INSERT ANY ELECTRICAL WARNINGS, e.g., Always double-check logic rail voltages before powering the SBC.]

* **High-Level Circuit Diagram:** `![Circuit Diagram](INSERT IMAGE PATH)`

---

## 7.0 Edge AI Vision System

### 7.1 Hardware Setup (ESP32-CAM)
[INSERT MOUNTING, POWER, AND WIRING DETAILS FOR THE CAMERA MODULE]

### 7.2 State Machine Logic
[INSERT DETAILS ON THE LOCAL ML INFERENCE, ANOMALY DETECTION STATES, AND RECOVERY LOGIC]
* **State Diagram:** `![FSM Logic](INSERT IMAGE PATH)`
* **Detection Model:** `![Model Accuracy Matrix](INSERT IMAGE PATH)`

---

## 8.0 Firmware Configuration
*Source files located in `/firmware/` directory.*

### 8.1 Klipper (`printer.cfg`)
[INSERT EXPLANATION OF KINEMATICS CONFIG, STEPPER SETTINGS, OR MACROS]
```ini
# [INSERT CRITICAL/UNIQUE KLIPPER CONFIG SNIPPETS HERE]
# Keep it to highlights; link to the full file for the rest.
```

### 8.2 Input Shaping
[INSERT DETAILS ON ADXL345 MOUNTING AND RESONANCE COMPENSATION RESULTS]

---

## 9.0 Known Issues & Errata
* **[ISSUE TICKET #] - [ISSUE TITLE]:** [INSERT DESCRIPTION AND CURRENT WORKAROUND/STATUS]
* **[ISSUE TICKET #] - [ISSUE TITLE]:** [INSERT DESCRIPTION AND CURRENT WORKAROUND/STATUS]

---
*End of Document. Maintained by [INSERT NAME]. Licensed under [INSERT LICENSE].*