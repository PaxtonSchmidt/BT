interface ConsumeCookieFlags {
  entireTokenFlag: string;
  tokenUserIdFlag: string;
  tokenTeamIdFlag: string;
  tokenUserAndTeamIdFlag: string;
  tokenValidationFlag: string;
  tokenUserTeamRoleIdFlag: string;
  tokenSocketIoFlag: string;
}

export const consumeCookieFlags: ConsumeCookieFlags = {
  entireTokenFlag: 'needEntireToken',
  tokenUserIdFlag: 'needTokenUser_id',
  tokenTeamIdFlag: 'needTokenTeam_id',
  tokenUserAndTeamIdFlag: 'needTokenUserAndTeam_Id',
  tokenValidationFlag: 'tokenValidationFlag',
  tokenUserTeamRoleIdFlag: 'tokenUserTeamAndRoleIDFlag',
  tokenSocketIoFlag: 'tockenSocketIoFlag',
};
