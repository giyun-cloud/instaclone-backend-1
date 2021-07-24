export default {
  User: {
    totalFollowers: (root) => {
      console.log("🔴🔴🔴🔴 User");
      console.log(root);
      return 666;
    },
    totalFollowing: () => 999,
  },
};
