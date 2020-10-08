const members = require("../../Members.js");
const express = require("express");
const router = express.Router();
const uuid = require("uuid");

router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const found = members.some((member) => parseInt(req.params.id) === member.id);

  if (found)
    res.json(members.filter((member) => parseInt(req.params.id) === member.id));
  else {
    res.status(400).json({ msg: `Member of id ${req.params.id} is not found` });
  }
});

router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    status: "active",
  };

  if (!req.body.name) {
    return res.status(400).json({ msg: "Please include a name" });
  }

  members.push(newMember);
  res.json(members);
  //res.redirect("/");
});

router.put("/:id", (req, res) => {
  const found = members.some((member) => parseInt(req.params.id) === member.id);

  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updateMember.name;

        res.json({ msg: "Member updated", member: member });
      }
    });
  } else {
    res.status(400).json({ msg: `Member of id ${req.params.id} is not found` });
  }
});

router.delete("/:id", (req, res) => {
  const found = members.some((member) => parseInt(req.params.id) === member.id);

  if (found)
    res.json({
      msg: "Member Deleted",
      members: members.filter(
        (member) => parseInt(req.params.id) !== member.id
      ),
    });
  else {
    res.status(400).json({ msg: `Member of id ${req.params.id} is not found` });
  }
});

module.exports = router;
