/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_address_group_view', {
		atd_addressid: {
			type: DataTypes.STRING(36),
			allowNull: false
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
		},
		atd_groupid: {
			type: DataTypes.STRING(36),
			allowNull: false
		},
		atd_name: {
			type: DataTypes.STRING(50),
			allowNull: true
		},
		type: {
			type: DataTypes.STRING(10),
			allowNull: true
		},
		special_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		range: {
			type: "DOUBLE",
			allowNull: true
		},
		is_field: {
			type: "DOUBLE",
			allowNull: true
		},
		late_minutes: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '60'
		},
		forth_hours: {
			type: DataTypes.INTEGER(4),
			allowNull: true,
			defaultValue: '3'
		}
	}, {
		tableName: 'atd_address_group_view',
		timestamps: false,
		freezeTableName: true
	});
};
