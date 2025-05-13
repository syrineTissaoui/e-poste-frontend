export const getDashboardHomeByRole = (role) => {
  switch (role) {
    case 'admin':
      return '/dashboard';
    case 'client':
      return '/dashboard/acceuil-client';
    case 'livreur':
      return '/dashboard/acceuil-livreur';
    case 'support-client':
      return '/dashboard/acceuil-support';
    default:
      return '/dashboard';
  }
};
