const UserModel = require('../models/UserModel');
const ProfileModel = require('../models/ProfileModel');
const { userNoProfile, profileHandleExist, noProfiles } = require('../common/errorMessage');

const getUserProfile = async (req, res) => {
  const profile = await ProfileModel.findOne({ user: req.user.id }).populate('user', [
    'name',
    'avatar'
  ]);
  if (!profile) {
    res.status(userNoProfile.code);
    res.json(userNoProfile);
  }
  res.json(profile);
};
const createUserProfile = async (req, res) => {
  // get fields
  const {
    handle,
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = req.body;
  const profileFields = {
    user: req.user.id,
    social: {}
  };
  // check
  if (handle) profileFields.handle = handle;
  if (company) profileFields.company = company;
  if (website) profileFields.website = website;
  if (location) profileFields.location = location;
  if (bio) profileFields.bio = bio;
  if (status) profileFields.status = status;
  if (githubusername) profileFields.githubusername = githubusername;
  if (skills !== 'undefined') profileFields.skills = skills.split(',');
  if (youtube) profileFields.social.youtube = youtube;
  if (twitter) profileFields.social.twitter = twitter;
  if (facebook) profileFields.social.facebook = facebook;
  if (linkedin) profileFields.social.linkedin = linkedin;
  if (instagram) profileFields.social.instagram = instagram;

  // check if handle exist
  const handleProfile = await ProfileModel.findOne({ handle: profileFields.handle });
  if (handleProfile && handleProfile.user.toString() !== req.user.id) {
    res.status(profileHandleExist.code);
    return res.json(profileHandleExist);
  }

  const profile = await ProfileModel.findOne({ user: req.user.id });
  let savedProfile;
  if (profile) {
    // update
    savedProfile = await ProfileModel.findOneAndUpdate(
      { user: req.user.id },
      { $set: profileFields },
      { new: true, useFindAndModify: false }
    );
  } else {
    // save
    savedProfile = await new ProfileModel(profileFields).save();
  }

  res.json(savedProfile);
};
const getUserProfileByHandle = async (req, res) => {
  const profile = await ProfileModel.findOne({ handle: req.params.handle }).populate('user', [
    'name',
    'avatar'
  ]);

  if (!profile) {
    res.status(userNoProfile.code);
    return res.json(userNoProfile);
  }

  res.json(profile);
};
const getUserProfileByUserId = async (req, res) => {
  const profile = await ProfileModel.findOne({ user: req.params.user_id }).populate('user', [
    'name',
    'avatar'
  ]);

  if (!profile) {
    res.status(userNoProfile.code);
    return res.json(userNoProfile);
  }

  res.json(profile);
};
const getAllUserProfile = async (req, res) => {
  const profiles = await ProfileModel.find().populate('user', ['name', 'avatar']);

  if (!profiles) {
    res.status(noProfiles.code);
    return res.json(noProfiles);
  }

  res.json(profiles);
};
const addExperience = async (req, res) => {
  const {
    title, company, location, from, to, current, description
  } = req.body;
  const profile = await ProfileModel.findOne({ user: req.user.id });
  if (!profile) {
    res.status(userNoProfile.code);
    return res.json(userNoProfile);
  }

  // save
  const newExp = {
    title,
    company,
    location,
    from,
    to,
    current,
    description
  };
  profile.experience.unshift(newExp);
  const savedProfile = await profile.save();

  res.json(savedProfile);
};
const addEducation = async (req, res) => {
  const {
    school, degree, fieldofstudy, from, to, current, description
  } = req.body;
  const profile = await ProfileModel.findOne({ user: req.user.id });
  // save
  const newEdu = {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description
  };
  profile.education.unshift(newEdu);
  const savedProfile = await profile.save();

  res.json(savedProfile);
};
const deleteExperience = async (req, res) => {
  const profile = await ProfileModel.findOne({ user: req.user.id });
  const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

  // Splice
  profile.experience.splice(removeIndex, 1);
  const savedProfile = await profile.save();

  res.json(savedProfile);
};
const deleteEducation = async (req, res) => {
  const profile = await ProfileModel.findOne({ user: req.user.id });
  const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id);

  // Splice
  profile.education.splice(removeIndex, 1);
  const savedProfile = await profile.save();

  res.json(savedProfile);
};
const deleteUserProfile = async (req, res) => {
  await ProfileModel.findOneAndRemove({ user: req.user.id }, { useFindAndModify: false });
  await UserModel.findOneAndRemove({ _id: req.user.id }, { useFindAndModify: false });

  res.json({ success: true });
};
module.exports = {
  getUserProfile,
  createUserProfile,
  getUserProfileByHandle,
  getUserProfileByUserId,
  getAllUserProfile,
  addExperience,
  addEducation,
  deleteExperience,
  deleteEducation,
  deleteUserProfile
};
