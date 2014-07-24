class AddProtocolNameToRuns < ActiveRecord::Migration
  def change
  	change_table :runs do |t|
    	t.string :protocolName 
    end
  end
end
