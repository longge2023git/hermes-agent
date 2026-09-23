import { translateNow } from '@/i18n'

import type { BillingRefusal } from './api'

export interface BillingRefusalPresentation {
  action: { type: 'none' } | { type: 'portal'; url?: string } | { type: 'retry' } | { type: 'step_up' }
  message: string
  title: string
}

// `refusal.kind` / `refusal.actor` / `action.type` are backend values compared
// (never rendered), so they stay literal. Every string that reaches the user is
// resolved from `billing.refusal.*` — this module has no React hook, so it goes
// through the module-scope translator.

const portalAction = (url?: string): BillingRefusalPresentation['action'] => ({ type: 'portal', url })

/** The "(try again in ~N min)" tail as its own message, so a locale owns the
 *  whole phrase (leading space included) instead of gluing English onto a
 *  translated sentence. Empty when the server sent no `retryAfter`. */
const retryDelayNote = (refusal: BillingRefusal): string =>
  refusal.retryAfter ? translateNow('billing.refusal.retryDelay', Math.max(1, Math.round(refusal.retryAfter / 60))) : ''

const retryMessage = (refusal: BillingRefusal): string =>
  translateNow('billing.refusal.tooManyChargesBody', retryDelayNote(refusal))

const stripeRetryMessage = (refusal: BillingRefusal): string =>
  translateNow('billing.refusal.stripeBody', retryDelayNote(refusal))

export const resolveRefusal = (refusal: BillingRefusal): BillingRefusalPresentation => {
  switch (refusal.kind) {
    case 'consent_required':
      return {
        action: portalAction(refusal.portalUrl),
        message: translateNow('billing.refusal.cardConfirmBody'),
        title: translateNow('billing.refusal.cardConfirmTitle')
      }

    case 'insufficient_scope':
      return {
        action: { type: 'step_up' },
        message: translateNow('billing.refusal.scopeBody'),
        title: translateNow('billing.refusal.scopeTitle')
      }
    case 'remote_spending_revoked': {
      const who =
        refusal.actor === 'admin'
          ? translateNow('billing.refusal.remoteSpendingStoppedByAdmin')
          : translateNow('billing.refusal.remoteSpendingStoppedByYou')

      return {
        action: portalAction(refusal.portalUrl),
        message: translateNow('billing.refusal.remoteSpendingReconnect', who),
        title: translateNow('billing.refusal.remoteSpendingTitle')
      }
    }

    case 'session_revoked':
      return {
        action: portalAction(refusal.portalUrl),
        message: translateNow('billing.refusal.sessionBody'),
        title: translateNow('billing.refusal.sessionTitle')
      }

    case 'cli_billing_disabled':

    case 'remote_spending_disabled':
      return {
        action: portalAction(refusal.portalUrl),
        message: translateNow('billing.refusal.remoteOffBody'),
        title: translateNow('billing.refusal.remoteOffTitle')
      }

    case 'role_required':
      return {
        action: portalAction(refusal.portalUrl),
        message: translateNow('billing.refusal.roleBody'),
        title: translateNow('billing.refusal.roleTitle')
      }

    case 'idempotency_conflict':
      return {
        action: { type: 'none' },
        message: translateNow('billing.refusal.idempotencyBody'),
        title: translateNow('billing.refusal.idempotencyTitle')
      }

    case 'no_payment_method':
      return {
        action: portalAction(refusal.portalUrl),
        message: translateNow('billing.refusal.noCardBody'),
        title: translateNow('billing.refusal.noCardTitle')
      }

    case 'org_access_denied':
      return {
        action: { type: 'none' },
        message: translateNow('billing.refusal.orgBody'),
        title: translateNow('billing.refusal.orgTitle')
      }
    case 'monthly_cap_exceeded': {
      const remaining = refusal.payload?.remainingUsd

      return {
        action: portalAction(refusal.portalUrl),
        message:
          remaining != null
            ? translateNow('billing.refusal.monthlyCapBodyWithHeadroom', remaining)
            : translateNow('billing.refusal.monthlyCapBody'),
        title: translateNow('billing.refusal.monthlyCapTitle')
      }
    }

    case 'rate_limited':

    case 'temporarily_unavailable':
      return {
        action: { type: 'retry' },
        message: retryMessage(refusal),
        title: translateNow('billing.refusal.tooManyChargesTitle')
      }

    case 'stripe_unavailable':
      return {
        action: { type: 'retry' },
        message: stripeRetryMessage(refusal),
        title: translateNow('billing.refusal.stripeTitle')
      }

    case 'upgrade_cap_exceeded':
      return {
        action: { type: 'none' },
        message: translateNow('billing.refusal.upgradeCapBody'),
        title: translateNow('billing.refusal.upgradeCapTitle')
      }

    case 'endpoint_unavailable':
      return {
        action: { type: 'retry' },
        message: refusal.message || translateNow('billing.refusal.endpointBody'),
        title: translateNow('billing.refusal.endpointTitle')
      }

    case 'timeout':
      return {
        action: { type: 'retry' },
        message: refusal.message || translateNow('billing.refusal.timeoutBody'),
        title: translateNow('billing.refusal.timeoutTitle')
      }

    case 'transport':
      return {
        action: { type: 'retry' },
        message: refusal.message || translateNow('billing.refusal.transportBody'),
        title: translateNow('billing.refusal.transportTitle')
      }

    default:
      return {
        action: { type: 'none' },
        message: refusal.message || translateNow('billing.refusal.failedBody'),
        title: translateNow('billing.refusal.failedTitle')
      }
  }
}
