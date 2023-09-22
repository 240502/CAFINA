Create procedure Pro_Create_Order
	@user_id int,
	@fullname nvarchar(50),
	@email varchar(50),
	@phone_number varchar(20),
	@address nvarchar(100),
	@note nvarchar(200),
	@order_date date,
	@status int,
	@list_json_order_detail nvarchar(max)
as
	begin
		Declare @orderId int
		insert into [Order] ([user_id],fullName,email,phone_number,[address],note,order_date,[status])
		values (@user_id,@fullname,@email,@phone_number,@address,@note,@order_date,@status)
		Set @orderId = (Select SCOPE_IDENTITY())
		If (@list_json_order_detail is not null)
		begin		
				INSERT INTO Order_Details(OrderId,ProductId,Price,Amount)
                Select  @orderId,JSON_VALUE(od.value,'$.productId'), JSON_VALUE(od.value,'$.price'),JSON_VALUE(od.value,'$.amount')    
                   from OpenJson(@list_json_order_detail) as od
		end
	end

select * from Order_Details
create fulltext catalog Search_Order
Create fulltext index on [Order](fullName)
key index PK__Order__3213E83FA8E0C7AA
select * from [Order]

exec Pro_Search_Order'SANG',1,10
ALTER procedure Pro_Search_Order
	@name nvarchar(50),
	@page_index int,
	@page_size int
as
	begin
		DECLARE @RecordCount BIGINT;
		if(@page_size >0)
		begin
			set Nocount on
			select (ROW_NUMBER()Over(Order by order_date )) as RowNumber,
			o.id,o.[user_id],o.fullName,o.email,o.phone_number,o.[address],o.note,o.order_date,o.[status],
			od.Od_id as Order_DetailId,od.ProductId,od.Price,od.Amount
			into #result1
			from [Order]  as o inner join Order_Details as od on o.id = od.OrderId
			where (@name = '' or  contains (fullName,@name))
			select @RecordCount = COUNT(*)
			from #result1
			select *, @RecordCount as recordcount
			from #result1
			where RowNumber between(@page_index-1) * @page_size+1 and (((@page_index-1)*@page_size+1)+@page_size)-1
				or @page_index =-1
			drop table #result1
		end
		else
		begin
			set nocount on
			select(ROW_NUMBER() over(order by order_date)) as Rownumber,
				o.id,o.[user_id],o.fullName,o.email,o.phone_number,o.[address],o.note,o.order_date,o.[status],
				od.Od_id as Order_DetailId,od.ProductId,od.Price,od.Amount
			into #result2
			from [Order]  as o inner join Order_Details as od on o.id = od.OrderId
 			where (@name = '' or contains(fullName,@name))
			select @RecordCount = COUNT(*)
			from #result2
			select *, @RecordCount as recordcount
			from #result2
			drop table #result2
		end
	end


alter proc Pro_GetById_Order
	@orderId int,

as
	begin
		if(not exists (Select * from [Order] where id = @orderId))
		begin
			return -1
		end
		select o.id,o.[user_id] ,o.fullName,o.email,o.phone_number,o.[address],o.note,o.order_date,o.[status], od.Od_id,od.ProductId,od.Price,od.Amount
		from [Order] as o inner join Order_Details as od on o.id = od.OrderId
		where o.id = @orderId

	end

alter procedure Pro_Delete_Order
	@orderId int
as
	begin
		if(not exists (Select * from [Order] where id = @orderId))
		begin
			return -1
		end
		delete [Order]
		where id = @orderId
		delete Order_Details 
		where Od_id = @orderId
	end

select * from 
Order_Details
select * from [Order]

alter  procedure Update_Order
	@orderid int,
	@user_id int,
	@fullname nvarchar(50),
	@email varchar(50),
	@phone_number varchar(20),
	@address nvarchar(100),
	@note nvarchar(200),
	@order_date date,
	@status int,
	@list_json_order_detail nvarchar(max)
as
	begin
		Update [Order]
		set [user_id]= @user_id,
			fullName = @fullname,
			email = @email,
			phone_number = @phone_number,
			[address]= @address,
			note = @note,
			order_date = @order_date,
			[status]= @status
		where id = @orderid
		If(@list_json_order_detail is not null)
		Begin
			Select 
				JSON_VALUE(od.value,'$.od_id') as Odeatil_id,
				JSON_VALUE(od.value,'$.productId') as ProductId,
				JSON_VALUE(od.value,'$.price') as Price,
				JSON_VALUE(od.value,'$.amount') as Amount,
				JSON_VALUE(od.value,'$.status') as [status]
			Into #Result1
			from OpenJson(@list_json_order_detail) as od
			

			If (exists (Select * from [Order] where id = @orderid))
			begin 
				Insert into Order_Details (OrderId,ProductId,Price,Amount)
				Select @orderid,#Result1.ProductId,#Result1.Price,#Result1.Amount
				From #Result1
				Where #Result1.[status] = '1'

				Update Order_Details
				set OrderId = @orderid,
					ProductId = #Result1.ProductId,
					Price = #Result1.Price,
					Amount = #Result1.Amount
				from #Result1
				where Order_Details.Od_id= #Result1.Odeatil_id and #Result1.[status]= '2' 
				
				Delete od
				from Order_Details od inner join #Result1 on od.Od_id = #Result1.Odeatil_id
				where  #Result1.[status] = '3'
				Drop table #Result1
			end

		end
	end

select * from [Order]
select * from Order_Details


Create procedure Pro_ThongKe_Khach 
	@page_index int,
	@page_size int,
	@fullname nvarchar(50),
	@ngaybd date,
	@ngaykt date
as
	begin
		declare @RecordCount int
		If (@page_size <>0)
		begin
			set nocount on
			Select(ROW_NUMBER() over(Order by o.order_date desc)) as RowNumber,
			o.fullName,o.[address],p.ProductId,p.title,od.price,od.Amount,o.order_date
			Into #Result1
			from [Order] o inner join Order_Details od on o.id = od.OrderId inner join Product p on od.ProductId = p.ProductId
			Where (@fullname = '' or Contains(fullName,@fullname)) 
			and( 
			(@ngaybd is null and @ngaykt is null) 
			or 
			(@ngaybd is not null and @ngaykt is null and o.order_date>= @ngaybd)
			or(@ngaybd is null and @ngaykt is not null and o.order_date <=@ngaykt)
			or(o.order_date between @ngaybd and @ngaykt))

			select @RecordCount = COUNT(*)
			from #Result1
			Select * , @RecordCount as RecordCount From #Result1
			Where RowNumber between((@page_index-1) * @page_size +1 ) and (((@page_index-1) * @page_size + 1)+@page_size) - 1
			or @page_index = -1
			drop table #Result1
		end
		Else
		begin
			Set nocount on
			Select(ROW_NUMBER() over(order by o.order_date desc )) as RowNumber,
			o.fullName,o.[address],p.ProductId,p.title,od.price,od.Amount,o.order_date
			into #Result2
			from [Order] o inner join Order_Details od on o.id = od.OrderId inner join Product p on od.ProductId =p.ProductId
  			where (@fullname = '' or contains(fullName,@fullname)) 
			and (
				(@ngaybd is null and @ngaykt is null)
				or (@ngaybd is not null and @ngaykt is null and o.order_date >=@ngaybd)
				or (@ngaybd is null and @ngaykt is not null and o.order_date<=@ngaykt)
				or (o.order_date between @ngaybd and @ngaykt)
			)
			select @RecordCount = count(*)
			from #Result2
			Select * , @RecordCount as RecordCount
			from #Result2
			Drop table #Result2
		end
	end