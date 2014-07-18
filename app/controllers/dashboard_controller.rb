class DashboardController < ApplicationController
	before_filter :authenticate_user!
  respond_to :json, :html
  def index
  	@users = User.all
  end

  def test
  	respond_with User.all
  end

  def create
  end
end
