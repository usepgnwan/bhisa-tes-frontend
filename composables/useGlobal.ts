export const useGlobal = () => {
//   const { t, locale, setLocale } = useI18n();
  const toast = useToast();
  const router = useRouter(); //navigate page, add query or parameter, locate history route
  const route = useRoute(); //show value route, id, query, and parameter
  // const api = useClient();

  function capitalize(str: string) {
    return str.replace(/\b\w/g, c => c.toUpperCase());
  }

  function showToast(title: string, type: 'primary' | 'success' | 'warning' | 'error', timeout?: number) {
    toast.clear();
    switch (type) {
      case 'primary':
        toast.add({
          title: capitalize(title),
          color: 'primary',
          icon: 'i-heroicons-check-badge',
          duration: timeout || 2000
        });
        break;
      case 'success':
        toast.add({
          title: capitalize(title),
          color: 'success',
          icon: 'i-heroicons-check-badge',
          duration: timeout || 2000
        });
        break;
      case 'warning':
        toast.add({
          title: capitalize(title),
          color: 'warning',
          icon: 'i-heroicons-hand-raised',
          duration: timeout || 2000
        });
        break;
      case 'error':
        toast.add({
          title: capitalize(title),
          color: 'error',
          icon: 'i-heroicons-no-symbol',
          duration: timeout || 2000
        });
        break;
      default:
        toast.add({
          title: capitalize(title),
          color: 'primary',
          icon: 'i-heroicons-check-badge',
          duration: timeout || 2000
        });
        break;
    }
  }

   
  return {
    // t,
    // locale,
    // setLocale,
    showToast,
    router,
    route 
    // api
  };
};
