---
layout: blog
title: Copy Constructor Magic
date: 2018-05-20T12:42:00.000Z
categories:
  - programming
  - cpp
---

<script markdown="0" src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
<p><i>This post is co-authored with [Meet Udeshi](http://udiboy1209.github.io/).</i></p>

<p>Examine this piece of code. It has two classes `foo` and `bar`, `bar` has an instance of `foo` and a function which fetches a new instance of `foo`, but the local variable in the function uses the same name as the member instance of `foo` in `bar`. This is allowed, `-Wshadow` will provide you a warning. But it is understood that this can result in unexpected or garbage output.</p>

```cpp
#include <iostream>
using namespace std;
                                                                                
class foo{                                                                      
    int x,y,z;                                                                  
                                                                                
    public:                                                                     
    int gx(){return x;};                                                        
    int gy(){return y;};                                                        
    int gz(){return z;};                                                        
    foo(int _x,int _y,int _z):x(_x),y(_y),z(_z){};                              
                                                                                
    /*foo(const foo &kk){                                                       
        x = kk.x;                                                               
        y = kk.y;                                                               
        z = kk.z;                                                               
    }*/                                                                         
                                                                                
    void print(void){                                                           
        cout << "x: " << x << ", " << "y: " << y << ", " << "z: " << z << endl; 
                                                                                
    }                                                                           
};                                                                              
                                                                                
class bar{                                                                      
    foo doo;                                                                    
                                                                                
    public:                                                                     
    bar(foo _doo):doo(_doo){};                                                  
    foo scoo(void);                                                             
};                                                                              
                                                                                
                                                                                
foo bar::scoo(void){                                                            
    foo doo(doo.gx(), doo.gy(), doo.gz());                                      
    return doo;                                                                 
}                                                                               
                                                                                
int main(){                                                                     
    bar obj(foo(1,1,1));                                                        
                                                                                
    for(int i = 0;i<5;i++){                                                     
        obj.scoo().print();                                                     
    }                                                                           
    return 0;                                                                   
}
```


<p>The above code, for example gives the following output. <i>g++ -O0 -std=c++11</i> with <i>g++ 5.4</i></p>
<pre>x: 6299752, y: 0, z: -19107175
x: -19107175, y: 0, z: 4197253
x: 4197253, y: 0, z: 4197253
x: 4197253, y: 0, z: 4197253
x: 4197253, y: 0, z: 4197253
</pre>

<p>Well, what were we thinking? What we have done is b******t and we get that for the output! Just a moment though, uncomment the explicit definition of the copy constructor for class `foo` and here is what you get</p>
<pre>x: 1, y: 1, z: 1
x: 1, y: 1, z: 1
x: 1, y: 1, z: 1
x: 1, y: 1, z: 1
x: 1, y: 1, z: 1
</pre>
<p>That is the magic that I had to show you. Now we shall investigate where it comes from. The copy constructor definition that we put in place is equivalent to the default copy constructor that gcc would provide. What is different here? To help me further with this issue, I brought in help from Meet. Most of the following is written by him, with a few minor edits by me.</p>

<h6>Basics of X86 assembly</h6>

<p>
The syntax is called "intel" syntax
which is basically `inst dest, source`.
</p>

<p>
There are various addressing modes in X86 for either source or destination.
They can either be a register (inside the processor) or a memory location (in RAM),
or a name of some register.
</p>

<p>
Memory locations are written inside square brackets. They can be static, or dynamically computed using an expression based on registers.
</p>

<p>
Registers are named `e**` and `r**`. When same last two letters of
such two registers, they refer to the whole register and 32-bit section.
Example: `eax` is 64-bit register, and `rax` refers to 32-bit MSB of `eax`.
So if you store a value in `eax` and read from `rax`, you will get higher
32 bits of the number stored. This was done as an addition for 64-bit processors over 32-bit processors (and also backward compatibility reasons).
</p>

<p>
Basic instructions are `mov` which *copies* value from source to destination,
`lea` or load effective address which copies memory address of the source
memory location to destination (much like creating a pointer),
`call` which is responsible for calling functions.
</p>

<p>
Special purpose registers are `rsp` and `rbp` which are stack pointer
and stack-base pointer or frame pointer. They store the location of the stack for
the function.
</p>


<h6>What goes wrong when shadowing</h6>

<p>
This is the assembly implementation of function bar::scoo()
</p>

<pre class="prettyprint"><code>push   rbp
mov    rbp,rsp
push   r12
push   rbx
sub    rsp,0x40
mov    QWORD PTR [rbp-0x38],rdi
mov    rax,QWORD PTR fs:0x28

mov    QWORD PTR [rbp-0x18],rax
xor    eax,eax
lea    rax,[rbp-0x30]
mov    rdi,rax
call   b28 &lt;_ZN3foo2gzEv&gt;
mov    r12d,eax
lea    rax,[rbp-0x30]
mov    rdi,rax
call   b16 &lt;_ZN3foo2gyEv&gt;
mov    ebx,eax
lea    rax,[rbp-0x30]
mov    rdi,rax
call   b06 &lt;_ZN3foo2gxEv&gt;
mov    esi,eax
lea    rax,[rbp-0x30]
mov    ecx,r12d
mov    edx,ebx
mov    rdi,rax
call   b3a &lt;_ZN3fooC1Eiii&gt;
mov    rax,QWORD PTR [rbp-0x30]
mov    QWORD PTR [rbp-0x24],rax
mov    eax,DWORD PTR [rbp-0x28]
mov    DWORD PTR [rbp-0x1c],eax
mov    rdx,QWORD PTR [rbp-0x24]
mov    eax,DWORD PTR [rbp-0x1c]
mov    rcx,rdx
mov    edx,eax
mov    rax,rcx
mov    rbx,QWORD PTR [rbp-0x18]
xor    rbx,QWORD PTR fs:0x28

je     a05 &lt;_ZN3bar4scooEv+0x8b&gt;
call   840 &lt;__stack_chk_fail@plt&gt;
add    rsp,0x40
pop    rbx
pop    r12
pop    rbp
ret    
</code></pre>

<ul>
<li> `sub rsp,0x40` subtracts 0x40 or 64 from register `rsp`
  i.e. allocating 64 bytes of space on the stack (stacks grow downward nowadays,
  so push operatins will decrement stack pointer)</li>
 
<li> When calling any function of class foo, we have to provide a pointer to instance of foo.
  Much similar to how you pass a special variable `self` in python for member function calls.
  So in this, the foo instance has been stored at `[rbp-0x30]`. 
  You can see that there are `lea rax, [rbp-0x30]` instructions before every function call.</li>

<li> `call &lt;_ZN3foo2gzEv&gt;` calls foo::gz() using instance of foo at `[rbp-0x30]`.
  Notice that this instance isn't initialised at all when we call gx(), gy() or gz().
  Hence, whatever values `[rbp-0x30]` has would be garbage. The calls return garbage
  and store it in local registers</li>

<li> The function then passes these garbage value to the final init call which is
  `call &lt;_ZN3fooC1Eiii&gt;`. Basically our `doo` instance is reading from its uninitialized
  self and using those values to then later finally initialize itself.</li>

</ul>

<p>
<em><b>Note</b>: In this case, the new `foo` variable was first allocated on the stack of function `scoo`
and hence held garbage. This happens because the lack of copy constructor
makes C++ restort to using internal copy operations 
i.e. when returning the final object, the total 12 bytes of object foo
are read into one 32-bit register and one 64-bit regster (rdx and eax) and returned</em> 
</p>

<h6>How does the copy constructor affect this?</h6>

<p>
The copy constructor leads to a change in the calling convention of the function scoo.
Previously, it returned the value by storing it inside registers. Now the caller(main function) provides callee(scoo function) with a pointer where it should store return value. You could think of it as pass by reference but for the return value.
</p>

<p>
Assembly for function bar::scoo()
</p>

<pre class="prettyprint"><code>
push   rbp
mov    rbp,rsp
push   r12
push   rbx
sub    rsp,0x20
mov    QWORD PTR [rbp-0x28],rdi
mov    QWORD PTR [rbp-0x30],rsi
mov    rax,QWORD PTR fs:0x28

mov    QWORD PTR [rbp-0x18],rax
xor    eax,eax
mov    rax,QWORD PTR [rbp-0x28]
mov    rdi,rax
call   b0c &lt;_ZN3foo2gzEv&gt;
mov    r12d,eax
mov    rax,QWORD PTR [rbp-0x28]
mov    rdi,rax
call   afa &lt;_ZN3foo2gyEv&gt;
mov    ebx,eax
mov    rax,QWORD PTR [rbp-0x28]
mov    rdi,rax
call   aea &lt;_ZN3foo2gxEv&gt;
mov    esi,eax
mov    rax,QWORD PTR [rbp-0x28]
mov    ecx,r12d
mov    edx,ebx
mov    rdi,rax
call   b1e &lt;_ZN3fooC1Eiii&gt;
nop
mov    rax,QWORD PTR [rbp-0x28]
mov    rdx,QWORD PTR [rbp-0x18]
xor    rdx,QWORD PTR fs:0x28

je     9f1 &lt;_ZN3bar4scooEv+0x77&gt;
call   840 &lt;__stack_chk_fail@plt&gt;
add    rsp,0x20
pop    rbx
pop    r12
pop    rbp
ret    
</code></pre>

<p>
Notice the difference here: instead of loading `rax` value using `lea` instruction, 
`mov rax,QWORD PTR [rbp-0x28]` is being used.
This will not load address `rbp-0x28` into `rax`, but simply copy value at
location `[rbp-0x28]` into `rax`.
</p>

<p>
But still, the same procedure is being conducted. 
The function calls `gx()`, `gy()`, `gz()` on this
uninitialised location given by value of `[rbp-0x28]`
and then calls the constructor with those values.
</p>

<p>
Then how does the correct value pop out?
We need to look at main() function where scoo() is called.
</p>

<pre class="prettyprint"><code>
mov    QWORD PTR [rbp-0x8],rax
xor    eax,eax
lea    rax,[rbp-0x14]
mov    ecx,0x1
mov    edx,0x1
mov    esi,0x1
mov    rdi,rax
call   b1e &lt;_ZN3fooC1Eiii&gt;
lea    rdx,[rbp-0x14]
lea    rax,[rbp-0x20]
mov    rsi,rdx
mov    rdi,rax
call   c36 &lt;_ZN3barC1E3foo&gt;
mov    DWORD PTR [rbp-0x24],0x0
cmp    DWORD PTR [rbp-0x24],0x4
jg     a71 &lt;main+0x77&gt;
lea    rax,[rbp-0x14]
lea    rdx,[rbp-0x20]
mov    rsi,rdx
mov    rdi,rax
call   97a &lt;_ZN3bar4scooEv&gt;
lea    rax,[rbp-0x14]
mov    rdi,rax
call   b88 &lt;_ZN3foo5printEv&gt;
add    DWORD PTR [rbp-0x24],0x1
jmp    a46 &lt;main+0x4c&gt;
mov    eax,0x0
mov    rcx,QWORD PTR [rbp-0x8]
xor    rcx,QWORD PTR fs:0x28
</code></pre>

<p>
We store the value of register `rdi` in `[rbp-0x28]` in function scoo(),
hence whatever is stored in `rdi` at time of calling would be used as
instance location of return foo class.
</p>

<p>
`lea rax,[rbp-0x14]` and `mov rdi,rax` lead to value `rbp-0x14` being passed to scoo as
location for return foo class. Note that is location is in the stack of `main()`
and not `scoo()` like previous case. 
</p>

<p>
Notice that `rbp-0x14` is first passed to the foo constructor. This is because of this line
of code
</p>


```cpp
bar obj(foo(1,1,1));
```


<p>
Here a temp `foo` object has to be initialised and then passed to bar constructor.
When that constructor is called, the `foo` object is not needed, hence compiler
tries to use that memory slot for the returned `foo` object. Ideally it should not have
optimised this because we have switched off optimisation with `-O0`
but this may be a flaw in GCC. So, instead of picking up garbage values in `scoo()`
it picks up the correct values from the temp variable because of reused stack slot.
</p>

<p>
The proof of this comes from the fact that, when compiled with another compiler like clang,
this behaviour is not replicated. Hence it is important to know that even the second code has
the error of shadowing, it just isn't being seen in the output due to a happy accident.
</p>

<p>Our four cents!</p>
