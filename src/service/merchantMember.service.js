import api from "./api";

/*
|--------------------------------------------------------------------------
| MERCHANT MEMBER SERVICE
|--------------------------------------------------------------------------
| Base: /api/v1/merchant-members
| All routes require: protect + requireMerchant + requirePermission(...)
|--------------------------------------------------------------------------
*/

export const merchantMemberService = {
  /**
   * Get all members of the current merchant
   * GET /merchant-members
   * Required permission: team.read
   */
  getMembers: async () => {
    const { data } = await api.get("/merchant-members");
    return data;
  },

  /**
   * Get a single member by ID
   * GET /merchant-members/:id
   * Required permission: team.read
   */
  getMember: async (memberId) => {
    const { data } = await api.get(`/merchant-members/${memberId}`);
    return data;
  },

  /**
   * Assign a role to a member
   * POST /merchant-members/:id/roles
   * Required permission: team.manage
   */
  assignRole: async (memberId, roleId) => {
    const { data } = await api.post(`/merchant-members/${memberId}/roles`, {
      roleId,
    });
    return data;
  },

  /**
   * Remove a role from a member
   * DELETE /merchant-members/:id/roles/:roleId
   * Required permission: team.manage
   */
  removeRole: async (memberId, roleId) => {
    const { data } = await api.delete(
      `/merchant-members/${memberId}/roles/${roleId}`
    );
    return data;
  },

  /**
   * Remove a member from the merchant (soft delete → status: REMOVED)
   * DELETE /merchant-members/:id
   * Required permission: team.manage
   */
  removeMember: async (memberId) => {
    const { data } = await api.delete(`/merchant-members/${memberId}`);
    return data;
  },
};

export default merchantMemberService;