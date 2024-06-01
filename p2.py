# -*- coding: utf-8 -*-
"""
Created on Fri May 10 16:10:09 2024

@author: Alkananda Tripathy
"""

from math import sin,cos
def func(x):
    return x*x+sin(x)
def gradient(x):
    return 2*x-cos(x)
def gradient_step(v,gradient,alpha=-0.1):
    step=alpha*gradient
    return v+step
def gradient_descent(f,v,alpha=-0.1,tol=0.00001):
   
    for i in range(1000):
        grad=gradient(v)
        if grad<tol:
            break
        v=gradient_step(v,grad,alpha)
        print(i,v)
v=2
gradient_descent(func,v)

