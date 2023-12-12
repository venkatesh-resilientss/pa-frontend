export const hasAccess = (user, category, subCategory) => {
  const userDetails = {
    Role: { AccessType: "", Permissions: null },
    ...user,
  };

  return (
    userDetails?.Role?.AccessType == "full_access" ||
    (userDetails?.Role?.Permissions
      ? userDetails?.Role?.Permissions[category][subCategory]
      : false)
  );
};
