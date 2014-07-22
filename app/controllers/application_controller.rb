class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json, :html
  def index
    @users = User.all
  end

  def test
  	respond_with User.all
  end

  # Call for the protocol that is accessed in newrun.js and used to serve as a template
  def protocoltype
    respond_with Protocol.find_by(name: params[:name])
  end

  def protocol
    respond_with Protocol.all
  end

  #Calls for all of the runs
  def run
    respond_with Run.all
  end

  def runtype
    respond_with Run.find_by(id: params[:id])
  end

  def createrun
    puts "hahah"
    puts params[:protocol]
    puts "james"
        new_run = Run.create(protocol_id: params[:protocol].id, user_id: 1, inputs: params[:values])

    respond_with(new_run) do |format|
      format.json { render :json => new_run.as_json }
    end
  end

  def user
    respond_with User.all
  end

# Pipet step and prepare solution step calls----------------------------------------------------------------
  def solutions
    puts params[:solution]

    respond_with Solution.where(name: params[:solution])
  end

  def updateSolutions
    puts params[:newVolume]
    puts params[:solutionNum]

    update_solution = Solution.find(params[:solutionNum]).update(quantity: params[:newVolume])
    respond_with(update_solution) do |format|
        format.json { render :json => update_solution.as_json }
      end
  end
end
