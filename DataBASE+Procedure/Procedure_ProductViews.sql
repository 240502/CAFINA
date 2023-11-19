

Use Cafina

alter Proc Pro_GetTotalProductViewInMonth
	@month int,
	@year int
As
	Begin
		Select Month(dateView)  as [month] , Year(dateView) as [year] ,SUM(count) as totalProductView
		 from ProductViews
		 Where Month(dateView) = @month and  Year(dateView) =@year
		 Group by Month(dateView),Year(dateView)
	End
	Select * From ProductViews
exec Pro_GetTotalProductViewInMonth 11,2023
Alter Proc Pro_Get_ProductViews_ByProductId
	@productId varchar(100),
	@date int,
	@month int,
	@year int
As
	Begin
		Select * From ProductViews
		Where ProductId = @productId  
		and Day(dateView) = @date
		and MONTH(dateView) = @month 
		and YEAR(dateView) = @year 
	End

	exec Pro_Get_ProductViews_ByProductId  '6TW23W007',18,11,2023


select * from ProductViews

Delete ProductViews

alter proc Pro_Create_ProductViews
	@productId varchar(100),
	@count int
As
	Begin
		Insert into ProductViews(ProductId,[count],dateView)
		Values (@productId,@count,GETDATE())
	End
Select * from ProductViews
alter Proc Pro_Update_ProductViews
	@id int,
	@productId varchar(100),
	@count int,
	@dateView date

As
	Begin
		Update ProductViews
		Set ProductId = @productId, count = @count, dateView = @dateView
		Where id = @id
	End
Create Proc Pro_Delete_ProductViews
	@id int
As 
	Begin
		Delete ProductViews
		Where id = @id
	End
Create Proc Pro_GetTotalProductViews
	
As
	Begin
		
	End