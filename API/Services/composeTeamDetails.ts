interface TeamDetail {
  owner_username: string;
  owner_discriminator: number;
  date_created: string;
  lifetime_ticket_count: number;
  teammate_count: number;
}

export default function composeTeamDetails(
  ticketCount: number,
  teammate_count: number,
  teamDetail: any
) {
  let teamDetails: TeamDetail = {
    owner_username: teamDetail.owner_username,
    owner_discriminator: teamDetail.owner_discriminator,
    date_created: teamDetail.date_created,
    teammate_count: Object.values(teammate_count)[0],
    lifetime_ticket_count: Object.values(ticketCount)[0],
  };
  return teamDetails;
}
