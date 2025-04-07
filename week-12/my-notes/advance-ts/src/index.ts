// Ugly approach to deal with objects
type UserTypes = {
  id: string;
  username: string;
};

type Users = {
  [key: string]: UserTypes;
};

const users: Users = {
  "1": {
    id: "1",
    username: "raj",
  },
  "2": {
    id: "2",
    username: "rishi",
  },
};

// Better approach (use Records)
type BetterUserType = Record<string, { id: string; username: string }>;

const betterUsers: BetterUserType = {
  "1": {
    id: "1",
    username: "raj",
  },
  "2": {
    id: "2",
    username: "rishi",
  },
};

// Map
const userMap = new Map();
userMap.set("3", { id: "3", username: "dev" }); // similar to users["3"] = {id: "3", username: "dev"}
userMap.set("4", { id: "4", username: "rajm" });

const user1 = userMap.get("4"); // similar to users["4"]
console.log(user1);
userMap.delete("3"); // delete the "3" value
