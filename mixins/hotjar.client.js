/* eslint-disable */
export default {
  mounted() {
    if (!this.includeHotjar) {
      return
    }

    // Hotjar script start
    (function(h,o,t,j,a,r) {
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:2373674,hjsv:6};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
    // Hotjar script end
  },
  computed: {
    includeHotjar () {
      // Réseau Fédération fraçaise des Banques Alimentaires
      // Département 34 ou 13
      // Activité Collecte de produit
      if (this.mission.structure?.reseaux?.some(reseau => reseau.id === 14)
        && ['13', '34'].includes(this.mission.department)
        && this.mission.activity?.id === 7) {
        return true
      }

      return [26955, 27087, 27300, 27256, 25875, 26574, 26945, 12737, 27017, 26122, 26896, 26141].includes(this.mission.id)
    },
  }

}
