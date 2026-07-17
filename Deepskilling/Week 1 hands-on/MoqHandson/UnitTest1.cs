using Moq;
using NUnit.Framework;

public interface IMailSender
{
    bool SendMail(string toAddress, string message);
}

public class CustomerComm
{
    private readonly IMailSender _mailSender;

    public CustomerComm(IMailSender mailSender)
    {
        _mailSender = mailSender;
    }

    public bool SendMailToCustomer()
    {
        return _mailSender.SendMail(
            "cust123@abc.com",
            "Some Message");
    }
}

[TestFixture]
public class MailSenderTests
{
    [Test]
    public void TestSendMail()
    {
        var mockMailSender = new Mock<IMailSender>();

        mockMailSender
            .Setup(x => x.SendMail(
                It.IsAny<string>(),
                It.IsAny<string>()))
            .Returns(true);

        CustomerComm customer =
            new CustomerComm(mockMailSender.Object);

        Assert.That(
            customer.SendMailToCustomer(),
            Is.True);
    }
}
