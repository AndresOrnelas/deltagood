class Solution < ActiveRecord::Base
	belongs_to :user
	serialize :reagents, Array
end
