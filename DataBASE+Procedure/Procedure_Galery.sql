use Cafina
select * From Product
select * From Galery

Create Proc Pro_Get_Galery_By_ProductId
	@ProductId varchar(100)
As
	Begin
		Select * From Galery
		Where ProductId =  @ProductId
	End
