# forgeflash

TODO: 
* Add Timer
* Support multiple games (half done)
* Add FLash Test (use swfobject.js script)
* Get app to run in node
* Remove autopublish (https://www.meteor.com/tutorials/react/publish-and-subscribe)
* Remove insecure (https://www.meteor.com/tutorials/react/security-with-methods)



script type="text/javascript" src="swfobject.js"></script
Then use it like so:

if(swfobject.hasFlashPlayerVersion("9.0.115"))
{
    alert("You have the minimum required flash version (or newer)");
}
else
{
    alert("You do not have the minimum required flash version");
}
Replace "9.0.115" with whatever minimum flash version you need. I chose 9.0.115 as an example because that's the version that added h.264 support.

If the visitor does not have flash, it will report a flash version of "0.0.0", so if you just want to know if they have flash at all, use:

if(swfobject.hasFlashPlayerVersion("1"))
{
    alert("You have flash!");
}
else
{
    alert("You do not flash :-(");
}