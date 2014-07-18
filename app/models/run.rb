class Run < ActiveRecord::Base
	serialize :times, Array
	serialize :changeList, Array
	serialize :inputs, Array

	belongs_to :user
	belongs_to :protocol
end
