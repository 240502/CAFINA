--Thống kê user mua hàng với số tiền lớn nhất

alter procedure Pro_ThongKe_User
	@fr_date datetime,
	@to_date datetime
as 
	begin
		select top 5 u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Role_Id, SUM(od.Amount*od.Price)  as [Tổng tiền mua]
		from Users u inner join  [Order] o on u.id = o.[user_id] inner join  Order_Details od on o.id = od.OrderId
		where (@fr_date is null and @to_date is null) 
			or (@fr_date is not null and @to_date is null and o.order_date >= @fr_date) 
			or(@fr_date is null and @to_date is not null and o.order_date <=@to_date)
			or(o.order_date between @fr_date and @to_date)
		group by  u.id,u.FullName,u.email,u.Phone_Number,u.BirthDay,u.Gender,u.Role_Id
		order by  [Tổng tiền mua] desc 
	end


