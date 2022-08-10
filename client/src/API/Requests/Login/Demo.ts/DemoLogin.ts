import postBase from "../../Base/postBaseRequest";

export default async function postDemoLogin(characterName: string) {
  return postBase('/demo/demoLogin', {characterName: characterName})
}
