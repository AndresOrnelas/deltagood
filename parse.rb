require 'spreadsheet'
Spreadsheet.client_encoding = 'UTF-8'
book = Spreadsheet.open 'Protocol.xls'
sheet = book.worksheet 'steps'
data = Array.new
sheet.each do |row|
	break if row[0].nil?
	if row[2] == 'prepare'
		data.push({name: row[1], type: row[2], ingredients: [row[3], row[4], product: row[5]]})
	elsif row[2] == ' mechanical'
		data.push({name: row[1], type: row[2], images: [row[3], row[4]]})
	elsif row[2] == 'pipet'
		data.push({name: row[1], type: row[2], ingredients: [row[3]]})
	elsif row[2] == 'incubation'
		data.push({name: row[1], type: row[2], time: row[3], temp: row[4]})
	end

end
print "steps: ["
data.each do |step|
	print  step.to_s + ","
end
puts "])"

File.open('data.txt', 'w'){ |file|
	file.write("steps: [")
	data.each do |step|
		file.write(step.to_s + ",")
	end
	file.write("])")
}