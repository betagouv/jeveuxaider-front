import { useAuthStore } from '@/store/auth'
import { useSettingsStore } from '@/store/settings'
import { useNotificationsStore } from '@/store/notifications'
import { useMessagingStore } from '@/store/messaging'
import { useStatisticsStore } from '@/store/statistics'
import { useTemoignageStore } from '@/store/temoignage'
import { useMissionShareStore } from '@/store/missionShare'
import { useAideModerationStore } from '@/store/aideModeration'
import { useAlgoliaSearchStore } from '@/store/algoliaSearch'
import { useSoftGateStore } from '@/store/softGate'
import { useStructureTagsStore } from '@/store/structureTags'
import { useArchivedUserStore } from '@/store/archivedUser'
import { useFormMissionStore } from '@/store/formMission'
import { useProfileOverlayCompletionStore } from '@/store/profileOverlayCompletion'
import { useUserAlertStore } from '@/store/userAlert'

export default defineNuxtPlugin(async () => {
  const storeAuth = useAuthStore()
  const storeSettings = useSettingsStore()
  const storeNotifications = useNotificationsStore()
  const storeMessaging = useMessagingStore()
  const storeStatistics = useStatisticsStore()
  const storeTemoignage = useTemoignageStore()
  const storeMissionShare = useMissionShareStore()
  const storeAideModeration = useAideModerationStore()
  const storeAlgoliaSearch = useAlgoliaSearchStore()
  const storeSoftGate = useSoftGateStore()
  const storeStructureTags = useStructureTagsStore()
  const storeArchivedUser = useArchivedUserStore()
  const storeFormMission = useFormMissionStore()
  const storeProfileOverlayCompletion = useProfileOverlayCompletionStore()
  const storeUserAlert = useUserAlertStore()
  const cookieAccessToken = useCookie('access-token')
  const cookieAccessTokenImpersonate = useCookie('access-token-impersonate')

  if (cookieAccessToken.value) {
    await storeAuth.fetchUser()
    Promise.all([
      storeNotifications.fetchNotifications(),
      storeNotifications.getUserUnreadNotificationsCount(),
      storeMessaging.getUserUnreadMessagesCount(),
    ])
  }
  if (cookieAccessTokenImpersonate.value) {
    storeAuth.isImpersonate = true
  }

  storeSettings.fetchGeneral()

  return {
    provide: {
      stores: {
        auth: storeAuth,
        settings: storeSettings,
        notifications: storeNotifications,
        statistics: storeStatistics,
        messaging: storeMessaging,
        temoignage: storeTemoignage,
        missionShare: storeMissionShare,
        aideModeration: storeAideModeration,
        algoliaSearch: storeAlgoliaSearch,
        softGate: storeSoftGate,
        structureTags: storeStructureTags,
        archivedUser: storeArchivedUser,
        formMission: storeFormMission,
        profileOverlayCompletion: storeProfileOverlayCompletion,
        userAlert: storeUserAlert,
      },
    },
  }
})
