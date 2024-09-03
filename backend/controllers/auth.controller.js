const register = async (req, res) => {
  res.send("this is register routes from auth.controller");
};

const login = async (req, res) => {
  res.send("this is login routes from auth.controller");
};

export { register, login };
