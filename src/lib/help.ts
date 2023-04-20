const isMac = () => navigator.platform.toUpperCase().indexOf("MAC") >= 0;
const modKey = () => (isMac() ? "Command" : "Ctrl");

export const help = `RegexGen> Hello! Welcome to RegexGen.
RegexGen> Our mission is to help you write some fancy regexes.
RegexGen> Press ${modKey()}+V to paste from your clipboard.

██╗  ██╗███████╗██╗     ██████╗ 
██║  ██║██╔════╝██║     ██╔══██╗
███████║█████╗  ██║     ██████╔╝
██╔══██║██╔══╝  ██║     ██╔═══╝ 
██║  ██║███████╗███████╗██║     
╚═╝  ╚═╝╚══════╝╚══════╝╚═╝     

Try selecting this by line double clicking with your mouse.

Great!, that was easy.
To deselect the line just double click again on it.

The colored blocks are hints for the content types we identified.
Hover with your mouse on a block to know more about it.

Select the following lines and inspect the blocks you find:

    human>    What's your address?
    mr.robot> 173.38.220.55
    human>    No, your local address?
    mr.robot> 127.0.0.1
    human>    No, I mean, what's your physical address?
    mr.robot> 0123.4567.89ab
    human>    #omg 🤦

By clicking a block you create a regex for that content type.
When more than one line is selected a regex is created to match the content between those lines.

Ok, time to paste some text here and try it out!
Use ${modKey()}+V or ${modKey()}+V on Mac to start.`.split("\n");

export const example = `Router# show interfaces
Ethernet 0 is up, line protocol is up
  Hardware is MCI Ethernet, address is 0000.0c00.750c (bia 0000.0c00.750c)
  Internet address is 131.108.28.8, subnet mask is 255.255.255.0
  MTU 1500 bytes, BW 10000 Kbit, DLY 100000 usec, rely 255/255, load 1/255
  Encapsulation ARPA, loopback not set, keepalive set (10 sec)
  ARP type: ARPA, ARP Timeout 4:00:00
  Last input 0:00:00, output 0:00:00, output hang never
  Last clearing of "show interface" counters 0:00:00
  Output queue 0/40, 0 drops; input queue 0/75, 0 drops
  Five minute input rate 0 bits/sec, 0 packets/sec
  Five minute output rate 2000 bits/sec, 4 packets/sec
     1127576 packets input, 447251251 bytes, 0 no buffer
     Received 354125 broadcasts, 0 runts, 0 giants
     0 input errors, 0 CRC, 0 frame, 0 overrun, 0 ignored, 0 abort
     5332142 packets output, 496316039 bytes, 0 underruns
     0 output errors, 432 collisions, 0 interface resets, 0 restarts

Last clearing of "show interface" counters 0:00:06
Input queue: 0/75/0 (size/max/drops); Total output drops: 21
Output queues: (queue #: size/max/drops)
    0: 14/20/14  1: 0/20/6  2: 0/20/0 3: 0/20/0 4: 0/20/0 5: 0/20/0 
    6: 0/20/0 7: 0/20/0  8: 0/20/0  9: 0/20/0  10: 0/20/0  

Router# show interfaces accounting
Interface TokenRing0 is disabled
Ethernet0
                Protocol    Pkts In   Chars In   Pkts Out  Chars Out
                      IP     873171  735923409      34624    9644258
                  Novell     163849   12361626      57143    4272468
                  DEC MOP          0          0          1         77
                      ARP      69618    4177080       1529      91740
Interface Serial0 is disabled
Ethernet1
                Protocol    Pkts In   Chars In   Pkts Out  Chars Out
                      IP          0          0         37      11845
                  Novell          0          0       4591     275460
                  DEC MOP          0          0          1         77
                      ARP          0          0          7        420
Interface Serial1 is disabled
Interface Ethernet2 is disabled
Interface Serial2 is disabled
Interface Ethernet3 is disabled
Interface Serial3 is disabled
Interface Ethernet4 is disabled
Interface Ethernet5 is disabled
Interface Ethernet6 is disabled
Interface Ethernet7 is disabled
Interface Ethernet8 is disabled
Interface Ethernet9 is disabled
Fddi0
                Protocol    Pkts In   Chars In   Pkts Out  Chars Out
                  Novell          0          0        183      11163
                      ARP          1         49          0          0
`.split("\n");
