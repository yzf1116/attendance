/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('pl_current_location', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		policeid: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		create_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		x_pt: {
			type: "DOUBLE",
			allowNull: true
		},
		y_pt: {
			type: "DOUBLE",
			allowNull: true
		}
	}, {
		tableName: 'pl_current_location',
		timestamps: false,
		freezeTableName: true
	});
};
