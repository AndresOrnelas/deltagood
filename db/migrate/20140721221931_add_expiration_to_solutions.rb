class AddExpirationToSolutions < ActiveRecord::Migration
  def change
    add_column :solutions, :expiration, :datetime
  end
end
