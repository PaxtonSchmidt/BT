import postBase from "../Base/postBaseRequest";

export default async function postInvalidateJWT() {
  return postBase('/logout/logout')
}
