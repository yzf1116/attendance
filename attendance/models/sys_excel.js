/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_excel', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		field: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		field_name: {
			type: DataTypes.STRING(2000),
			allowNull: true
		},
		td_type: {
			type: DataTypes.INTEGER(11),
			allowNull: true,
			defaultValue: '2'
		},
		table_name: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		is_export: {
			type: DataTypes.INTEGER(255),
			allowNull: true,
			defaultValue: '1'
		},
		order: {
			type: DataTypes.STRING(255),
			allowNull: true,
			defaultValue: ''
		},
		map_field: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		is_required: {
			type: DataTypes.INTEGER(255),
			allowNull: true,
			defaultValue: '0'
		},
		association_type: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: true,
			defaultValue: '0'
		},
		association_table: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		association_field: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		association_parent_field: {
			type: DataTypes.STRING(255),
			allowNull: true
		}
	}, {
		tableName: 'sys_excel',
		timestamps: false,
		freezeTableName: true
	});
};
