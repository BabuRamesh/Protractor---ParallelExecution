describe('say hello',function(){
    
ptor=protractor.getInstance();
beforeEach(function(){
    ptor.get("http://www.google.com");
    
});
it('says hello',function(){
var ptor = protractor.getInstance();
    ptor.findElement(protractor.By.id("gbqfq")).sendKeys("facebook");
    
});
});