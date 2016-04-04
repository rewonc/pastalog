from setuptools import setup

setup(name='pastalog',
      version='1.0.0',
      description='Simple, realtime visualization of neural network training performance.',
      url='http://github.com/rewonc/pastalog',
      author='Rewon Child',
      author_email='rewonc@gmail.com',
      license='MIT',
      packages=['pastalog'],
      install_requires=[
          'requests',
      ],
      scripts=['bin/pastalog'],
      zip_safe=False)