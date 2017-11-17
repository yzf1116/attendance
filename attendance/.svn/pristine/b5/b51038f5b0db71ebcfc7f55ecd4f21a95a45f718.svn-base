/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('sys_menu', {
		id: {
			type: DataTypes.STRING(36),
			allowNull: false,
			primaryKey: true
		},
		menu_level: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		menu_name: {
			type: DataTypes.STRING(50),
			allowNull: false
		},
		menu_order: {
			type: DataTypes.INTEGER(4),
			allowNull: true
		},
		menu_url: {
			type: DataTypes.STRING(255),
			allowNull: true
		},
		parent_menu_id: {
			type: DataTypes.STRING(36),
			allowNull: true
		},
		menu_type: {
			type: DataTypes.INTEGER(6),
			allowNull: true
		},
		menu_icon: {
			type: DataTypes.STRING(100),
			allowNull: true
		}
	}, {
		tableName: 'sys_menu',
		timestamps: false,
		freezeTableName: true
	});
};
