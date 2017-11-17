/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_address', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		location: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		address: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		x_point: {
			type: "DOUBLE",
			allowNull: true
		},
		y_point: {
			type: "DOUBLE",
			allowNull: true
		},
		remarks: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'atd_address',
		timestamps: false,
		freezeTableName: true
	});
};
