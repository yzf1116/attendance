/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('atd_group', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
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
		tableName: 'atd_group',
		timestamps: false,
		freezeTableName: true
	});
};
