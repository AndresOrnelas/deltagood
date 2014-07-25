class AddUserNameToSolutions < ActiveRecord::Migration
  def change
    add_column :solutions, :UserName, :string
  end
end
