const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authConfig = require("../../config/auth");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      lowercase: true,
      required: true
    },
    seller_id: {
      type: String,
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller"
    },
    password: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      required: true,
      default: true
    },
    token: String,
    roles: [
      {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user"
      }
    ]
  },
  { timestamps: true }
);

/**
 * UserSchema Methods/functions
 */
UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },

  generateToken() {
    this.token = jwt.sign(
      { id: this.id, roles: this.roles, seller_id: this.seller_id },
      authConfig.secret,
      {
        expiresIn: authConfig.ttl
      }
    );

    return token;
  }
};

module.exports = mongoose.model("User", UserSchema);
