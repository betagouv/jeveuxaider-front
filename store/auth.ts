import { useGtm } from '@gtm-support/vue-gtm'
import { defineStore } from 'pinia'
import { useNotificationsStore } from '~/store/notifications'
import { useMessagingStore } from '~/store/messaging'

type TypeRole = {
  key: string
  label: string
  contextable_id?: number
  contextable_type?: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null as User | null,
    isImpersonate: false,
  }),
  getters: {
    isLogged: (state) => !!state.user?.profile,
    contextRole: (state) => state.user?.context_role,
    contextableId: (state) => state.user?.contextable_id,
    roles: (state) => {
      return state.user?.roles.map((role) => {
        switch (role.name) {
          case 'admin':
            return {
              key: role.name,
              label: 'Modérateur',
            }
          case 'responsable':
            return {
              key: role.name,
              contextable_type: 'structure',
              contextable_id: role.pivot.rolable_id,
              label: role.pivot_model.name,
            }
          case 'referent':
            return {
              key: role.name,
              contextable_type: 'department',
              contextable_id: role.pivot.rolable_id,
              label: role.pivot_model.name,
            }
          case 'referent_regional':
            return {
              key: role.name,
              contextable_type: 'region',
              contextable_id: role.pivot.rolable_id,
              label: role.pivot_model.name,
            }
          case 'tete_de_reseau':
            return {
              key: role.name,
              contextable_type: 'reseau',
              contextable_id: role.pivot.rolable_id,
              label: role.pivot_model.name,
            }
          case 'responsable_territoire':
            return {
              key: role.name,
              contextable_type: 'responsable_territoire',
              contextable_id: role.pivot.rolable_id,
              label: role.pivot_model.name,
            }
        }
      }) as TypeRole[]
    },
    currentRole(state): TypeRole | undefined {
      return this.roles?.find((role) => role?.key === state.user?.context_role)
    },
    profile: (state) => state.user?.profile,
  },
  actions: {
    async fetchUser() {
      const cookieAccessToken = useCookie('access-token')
      if (!cookieAccessToken.value) {
        return
      }

      const { data: user, error } = await useApiFetch<User>(`/user`)
      if (error.value) {
        this.user = null
        cookieAccessToken.value = null
        return error.value
      }
      if (user.value) {
        this.user = user.value
      }
    },
    async login(form: { email: string; password: string }) {
      const config = useRuntimeConfig()
      let cookieAccessToken = useCookie('access-token')
      const cookieAccessTokenImpersonate = useCookie('access-token-impersonate')
      const gtm = useGtm()

      const { data, error } = await useApiFetch<any>(`${config.public.apiUrl}/oauth/token`, {
        method: 'POST',
        body: {
          grant_type: 'password',
          client_id: config.public.oauth.clientId,
          client_secret: config.public.oauth.clientSecret,
          scope: '*',
          username: form.email.toLowerCase(),
          password: form.password,
        },
      })

      if (error.value) {
        cookieAccessToken.value = null
        cookieAccessTokenImpersonate.value = null
        return error.value
      }

      cookieAccessToken = useCookie('access-token', {
        maxAge: data.value.expires_in,
        path: '/',
        secure: document.location.hostname !== 'localhost', // true doesn't work on localhost and safari
      })
      cookieAccessToken.value = data.value.access_token

      gtm?.trackEvent({ event: 'user-login' })

      await nextTick() // wait for cookie
      await this.fetchUser()

      const storeNotifications = useNotificationsStore()
      const storeMessaging = useMessagingStore()

      Promise.all([
        storeNotifications.fetchNotifications(),
        storeNotifications.getUserUnreadNotificationsCount(),
        storeMessaging.getUserUnreadMessagesCount(),
      ])
    },
    async logout() {
      const cookieAccessToken = useCookie('access-token')
      const cookieAccessTokenImpersonate = useCookie('access-token-impersonate')

      navigateTo('/')
      await useApiFetch(`/logout`, {
        method: 'POST',
      })
      cookieAccessToken.value = null
      cookieAccessTokenImpersonate.value = null
      this.user = null
    },
    async updateUser(attributes: Partial<User>) {
      const { data: user, error } = await useApiFetch<User>(`/user`, {
        method: 'PUT',
        body: {
          ...this.user,
          ...attributes,
        },
      })

      if (error.value) {
        return error.value
      }

      this.user = user.value
    },
    async updateProfile(payload: Partial<Profile> & { id: number }) {
      const { data: profile, error } = await useApiFetch<Profile>(`/profiles/${payload.id}`, {
        method: 'PUT',
        body: { ...payload },
      })

      if (error.value) {
        return error.value
      }

      await this.fetchUser()
    },
    async registerVolontaire(form: any) {
      const { data: user, error } = await useApiFetch<User>(`/register/volontaire`, {
        method: 'POST',
        body: { ...form },
      })

      if (error.value) {
        if (
          error.value.data.errors?.email?.[0] ===
          'Cet email est déjà pris. Merci de vous connecter avec vos identifiants.'
        ) {
          navigateTo(`/login?email=${form.email}`)
        }
        return error.value
      }

      await this.login({ email: form.email, password: form.password })
    },
    async registerResponsable(form: any) {
      const { data: user, error } = await useApiFetch<User>(`/register/responsable`, {
        method: 'POST',
        body: { ...form },
      })

      if (error.value) {
        if (
          error.value.data.errors?.email?.[0] ===
          'Cet email est déjà pris. Merci de vous connecter avec vos identifiants.'
        ) {
          navigateTo(`/login?email=${form.email}`)
        }
        return error.value
      }

      await this.login({ email: form.email, password: form.password })
    },
    async impersonate(userId: number) {
      const cookieAccessTokenImpersonate = useCookie('access-token-impersonate', {
        maxAge: 3600,
        path: '/',
        secure: document.location.hostname !== 'localhost', // true doesn't work on localhost and safari
      })
      const { data, error } = await useApiFetch<any>(`/users/${userId}/impersonate`, {
        method: 'POST',
      })

      if (error.value) {
        cookieAccessTokenImpersonate.value = null
        return error.value
      }

      cookieAccessTokenImpersonate.value = data.value.accessToken

      const cookieTokenIdImpersonate = useCookie('token-id-impersonate', {
        maxAge: 3600,
        path: '/',
      })
      cookieTokenIdImpersonate.value = data.value.token.id

      this.isImpersonate = true
      await nextTick() // wait for cookie
      await this.fetchUser()

      const storeNotifications = useNotificationsStore()
      const storeMessaging = useMessagingStore()

      Promise.all([
        storeNotifications.fetchNotifications(),
        storeNotifications.getUserUnreadNotificationsCount(),
        storeMessaging.getUserUnreadMessagesCount(),
      ])
      navigateTo('/')
    },
    async stopImpersonate() {
      const cookieAccessTokenImpersonate = useCookie('access-token-impersonate')
      const cookieTokenIdImpersonate = useCookie('token-id-impersonate')
      if (cookieTokenIdImpersonate.value) {
        const { data, error } = await useApiFetch<any>(
          `/impersonate/${cookieTokenIdImpersonate.value}`,
          {
            method: 'DELETE',
          }
        )
        if (error.value) {
          return error.value
        }
      }
      cookieAccessTokenImpersonate.value = null
      cookieTokenIdImpersonate.value = null
      this.isImpersonate = false

      await nextTick() // wait for cookie
      await this.fetchUser()

      const storeNotifications = useNotificationsStore()
      const storeMessaging = useMessagingStore()

      Promise.all([
        storeNotifications.fetchNotifications(),
        storeNotifications.getUserUnreadNotificationsCount(),
        storeMessaging.getUserUnreadMessagesCount(),
      ])
      navigateTo('/')
    },
  },
})
