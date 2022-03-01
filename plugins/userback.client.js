
/* eslint-disable */
export default ({ store }) => {
    window.Userback = window.Userback || {};
    Userback.access_token = '30536|65722|SFhRqKNspyVLZotqUrq7XqOu0';

    if(store.getters.profile) {
        Userback.email = store.getters.email
        Userback.user_data = {
            id: store.getters.profile.id,
            info: {
                name:  store.getters.full_name,
                email: store.getters.email,
                account_id: store.getters.profile.id,
                context_role: store.getters.contextRole,
                contextable_id: store.getters.contextableId
            }
        };
    }

    (function(d) {
        var s = d.createElement('script');s.async = true;
        s.src = 'https://static.userback.io/widget/v1.js';
        (d.head || d.body).appendChild(s);
    })(document);
  }
  