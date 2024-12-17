const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // Hash password before saving
  Admin.beforeCreate(async (admin) => {
    admin.password = await bcrypt.hash(admin.password, 10);
  });

  // Instance method to check password
  Admin.prototype.validatePassword = async function(password) {
    return bcrypt.compare(password, this.password);
  };

  return Admin;
};