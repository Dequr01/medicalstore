# Majeed Pharmacy Platform - Feature Checklist & Implementation Roadmap

> **Status Reference**:
> - **[x] KEEP (Shipped in MVP)**: Core production functionality included in the primary build.
> - **[ ] PHASE 2**: Real-world backend, user authentication, or clinical integrations planned for subsequent rollout.
> - **[~] CUT**: Removed from scope (security risks, simulated/fake claims, IoT requirements, or US-only specifications).

---

## 1. Consumer Storefront

| Feature | Verdict | Implementation Note | Status |
| :--- | :--- | :--- | :---: |
| **License ticker** | Keep (simplified) | Real license number only (`#RX-884920`). Dropped HIPAA badge and fake ETA. | [x] KEEP |
| **Dual-portal switcher** | Cut | Security risk having direct patient-to-admin toggle in header. Restricted to dedicated staff portal URL (`/pharmacist-portal`). | [~] CUT |
| **Live search bar** | Keep | Core real-time search across medications & categories. | [x] KEEP |
| **Upload Rx + cart pill** | Keep | Core direct call-to-actions in header. | [x] KEEP |
| **Patient profile pill (MRN)** | Phase 2 | Needs patient accounts & authentication infrastructure. | [ ] PHASE 2 |
| **Mobile drawer** | Keep | Core responsive drawer navigation for handheld devices. | [x] KEEP |
| **Split hero** | Keep | Dropped animated fleet badges & simulated ETA claims. Clean clinical value statement. | [x] KEEP |
| **Express refill lookup** | Phase 2 | Requires live pharmacy management system (PMS) database integration. | [ ] PHASE 2 |
| **Trust strip** | Keep | Only genuine claims (100% Genuine batch verified, Licensed Pharmacist on staff). Dropped DEA claims. | [x] KEEP |
| **Category grid** | Keep | Core department navigation (Prescriptions, OTC, Health Essentials). | [x] KEEP |
| **Featured medicines** | Keep | Real stock counters and authentic medicine pricing. | [x] KEEP |
| **Cold-chain banner** | Cut | Cut unless specialized 2–8°C refrigerated fleet is physically deployed. | [~] CUT |
| **Catalog filter tabs (Rx/OTC)** | Keep | Core filter between Prescription-only drugs and OTC products. | [x] KEEP |
| **Sorting** | Keep (price only) | Price: Low to High / High to Low. Remaining complex algorithms moved to Phase 2. | [x] KEEP |
| **Search integration** | Keep | Instant search query integration across all catalog listings. | [x] KEEP |
| **Quick-add modal** | Keep | Simplified to product photo, dosage, quantity selector, and Add button. | [x] KEEP |
| **Upload Rx (drag and drop)** | Keep | Core intake: patient uploads paper prescription photo or PDF. | [x] KEEP |
| **Enter Rx number** | Phase 2 | Planned for Phase 2 once patient PMS link is live. | [ ] PHASE 2 |
| **Clinic EHR sync** | Cut | Cut simulated Surescripts/Epic/Cerner sync and SSN collection. | [~] CUT |
| **STAT emergency refill** | Phase 2 | Only when guaranteed rapid courier infrastructure is active. | [ ] PHASE 2 |
| **Queue sync to pharmacist** | Keep | Core real-time handoff from customer submission to dispensary triage queue. | [x] KEEP |
| **Live chat** | Phase 2 | WhatsApp direct clinical helpline link for MVP. | [ ] PHASE 2 |
| **Interaction checker** | Cut | Safety, clinical liability, and data risk. | [~] CUT |
| **Pharmacist directory** | Cut | Low value for consumer storefront. | [~] CUT |
| **Health devices grid** | Phase 2 | Treated as normal store items for MVP rather than diagnostic hardware. | [ ] PHASE 2 |
| **Device telemetry notice** | Cut | Cut simulated automated Bluetooth vitals sync. | [~] CUT |
| **Cart management** | Keep | Core slide-out drawer + cart page with quantity adjustment and removal. | [x] KEEP |
| **Courier windows** | Keep (simplified) | Standard Delivery or Scheduled Delivery only. Dropped simulated 20-min STAT. | [x] KEEP |
| **Address field** | Keep | Core destination address capture. | [x] KEEP |
| **Payment selector** | Keep (changed) | Cash on Delivery (COD) and Local Card / Bank Transfer. Dropped US PBM Insurance & HSA/FSA. | [x] KEEP |
| **Price breakdown** | Keep | Subtotal, transparent delivery fee, and net total. | [x] KEEP |
| **Confetti** | Cut | Clean professional medical confirmation without decorative confetti. | [~] CUT |
| **Patient portal: order/Rx status** | Phase 2 | Minimal order tracking in Phase 2. | [ ] PHASE 2 |
| **Patient portal: allergies** | Phase 2 | Stored with patient health record under secure auth in Phase 2. | [ ] PHASE 2 |
| **Bluetooth vitals** | Cut | Requires custom companion mobile app and connected medical IoT devices. | [~] CUT |

---

## 2. Pharmacist Operations Hub

| Feature | Verdict | Implementation Note | Status |
| :--- | :--- | :--- | :---: |
| **Branch/DEA/vault badge** | Cut | Removed cosmetic vault lock & DEA indicators. | [~] CUT |
| **Pending counter** | Keep | Displays live count of new prescriptions awaiting verification. | [x] KEEP |
| **Navigation** | Keep | Streamlined to shipped modules: Rx Verification Queue & Simple Stock Inventory. | [x] KEEP |
| **Storefront return switch** | Keep | Convenient link to view customer-facing storefront. | [x] KEEP |
| **Rx queue filters** | Keep | Filter by All vs Pending Review. | [x] KEEP |
| **Rx selector and details** | Keep | View uploaded script image, patient name, DOB, and medication info. | [x] KEEP |
| **Verification checklist** | Keep (adapted) | Patient allergy review and doctor verification. Dropped US PDMP and DEA checks. | [x] KEEP |
| **Approve / dispatch / complete** | Keep | Core dispensary workflow: "Approve for Dispensing", "Hand to Courier", "Mark Completed". | [x] KEEP |
| **Cold-storage telemetry** | Cut | Needs physical IoT temperature sensors. | [~] CUT |
| **NDC stock ledger** | Keep (simplified) | Simple stock ledger tracking Item Name, Batch #, Expiry Date, In-Stock Qty, and Re-order Alert. | [x] KEEP |
| **Fleet status cards** | Phase 2 | MVP: basic rider assignment and status dropdown. | [ ] PHASE 2 |
| **On-demand dispatch** | Cut | Automated dispatch triggers cut. | [~] CUT |
| **Controlled substances log** | Phase 2 | To be implemented according to local health authority regulations in Phase 2. | [ ] PHASE 2 |
| **Variance index** | Cut | Removed simulated variance calculation. | [~] CUT |
| **NCPDP claims** | Cut | Cut US-only insurance claims protocol. | [~] CUT |
| **Settlement metrics** | Phase 2 | Standard daily sales and order summary report. | [ ] PHASE 2 |
| **Prescriber directory** | Phase 2 | Centralized physician registry moved to Phase 2. | [ ] PHASE 2 |
| **Staff licensure** | Phase 2 | Internal staff credential management moved to Phase 2. | [ ] PHASE 2 |
