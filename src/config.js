/**
 * Shared snapshot constants.
 *
 * SOURCE_DEFS is the source-type registry. Lookups in the cards must use
 * these ids. Display names are source types, not vendor products.
 */

export const AS_OF = '2026-09-10T09:00:00.000Z';
export const AS_OF_MONTH = 8;
export const AS_OF_YEAR = 2026;

export const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

/** The four simulated systems, in retrieval order. Drives the assembly wheel. */
export const SOURCE_DEFS = [
  { id: 'crm', name: 'CRM', stage: 1, label: 'Relationship profile' },
  { id: 'billing', name: 'Billing', stage: 2, label: 'Revenue and invoices' },
  { id: 'transactions', name: 'Transactions', stage: 2, label: 'Processed volumes' },
  { id: 'delivery-tracking', name: 'Delivery tracking', stage: 3, label: 'Projects and tickets' },
];

/** Progress stages shown by the assembly wheel. Each maps to real retrieval work. */
export const ASSEMBLY_STAGES = [
  { at: 0.25, label: 'Account confirmed' },
  { at: 0.50, label: 'CRM relationship profile loaded' },
  { at: 0.75, label: 'Billing and transaction data loaded' },
  { at: 1.00, label: 'Delivery tracking and operational ticket data loaded' },
];
