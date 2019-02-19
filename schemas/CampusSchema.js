module.exports = (conn) => {
  const CampusSchema = new conn.Schema({
    slug: {
      type: String,
      lowercase: true,
      trim: true,
      minlength: 3,
      maxlength: 4,
      required: true,
      index: true,
      unique: true,
    },
    name: { type: String, required: true },
    locale: { type: String, required: true },
    timezone: { type: String, required: true },
    active: { type: Boolean, require: true, default: true },
    // Deberíamos llevar la cuenta del número de generaciones de cada campus acá?
    // generations: { type: Number, required: true, default: 0 }, // ????
  });

  return CampusSchema;
};
