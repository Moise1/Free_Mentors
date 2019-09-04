import hasher from "../helpers/password";
import tokenMan from "../helpers/tokenMan";


const adminPassword = async () => {
  const hash = await hasher.hashingPassword("job123", 10);
  return hash;
};
const userId = 1;
const is_admin = true;
const email = "job@freementors.com";
const token = tokenMan.tokenizer({ userId, is_admin });

const admin = adminPassword().then((pwd) => ({
  token,
  userId,
  first_name: "john",
  last_name: "job",
  email,
  address: "Kigali",
  password: pwd,
  is_admin,
})).then((res) => res).catch((err) => {
  throw err.message;
});

export default [admin];
