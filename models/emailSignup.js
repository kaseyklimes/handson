module.exports = (sequelize, DataTypes) => {
  const EmailSignup = sequelize.define('EmailSignup', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    signupDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  });

  return EmailSignup;
}; 